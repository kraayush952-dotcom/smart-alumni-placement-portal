const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");
const test = require("node:test");

process.env.JWT_SECRET = "student-api-unit-test-secret";

const pool = require("../config/db");
const cloudinary = require("../config/cloudinary");
const applicationRoutes = require("../routes/applicationRoutes");
const resumeRoutes = require("../routes/resumeRoutes");
const studentRoutes = require("../routes/studentRoutes");
const authMiddleware = require("../middleware/authMiddleware");
const requireStudentRole = require("../middleware/studentMiddleware");
const {
  uploadResume,
} = require("../controllers/resumeController");

const originalQuery = pool.query;
const originalUploadStream = cloudinary.uploader.upload_stream;
const originalDestroy = cloudinary.uploader.destroy;

test.afterEach(() => {
  pool.query = originalQuery;
  cloudinary.uploader.upload_stream = originalUploadStream;
  cloudinary.uploader.destroy = originalDestroy;
});

const tokenFor = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1m" });

const responseRecorder = () => ({
  statusCode: 200,
  body: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(body) {
    this.body = body;
    return this;
  },
});

const routeFor = (router, path, method) => {
  const layer = router.stack.find(
    (item) => item.route?.path === path && item.route.methods[method]
  );
  assert.ok(layer, `Missing route ${method.toUpperCase()} ${path}`);
  return layer.route.stack.map((item) => item.handle);
};

const runChain = async (handlers, req, res, index = 0) => {
  if (index >= handlers.length) return;

  let nextCalled = false;
  await new Promise((resolve, reject) => {
    const next = (error) => {
      if (error) return reject(error);
      nextCalled = true;
      resolve(runChain(handlers, req, res, index + 1));
    };

    try {
      Promise.resolve(handlers[index](req, res, next)).then(
        () => {
          if (!nextCalled) resolve();
        },
        reject
      );
    } catch (error) {
      reject(error);
    }
  });
};

const protectedRoutes = [
  [applicationRoutes, "/", "post", { jobId: 91 }],
  [applicationRoutes, "/my", "get"],
  [applicationRoutes, "/:id", "get", undefined, { id: "401" }],
  [resumeRoutes, "/", "post"],
  [resumeRoutes, "/my", "get"],
  [resumeRoutes, "/my", "delete"],
  [studentRoutes, "/profile", "get"],
  [studentRoutes, "/profile", "put", {
    full_name: "Test Student",
    mobile: "0000000000",
    batch_year: 2026,
    department: "Engineering",
  }],
];

test("all student-only routes reject missing and invalid authentication", async () => {
  let queryCount = 0;
  pool.query = async () => {
    queryCount += 1;
    return { rows: [] };
  };

  for (const [router, path, method, body, params = {}] of protectedRoutes) {
    for (const authorization of [undefined, "Bearer invalid-token"]) {
      const req = { headers: {}, body, params };
      if (authorization) req.headers.authorization = authorization;
      const res = responseRecorder();
      await runChain(routeFor(router, path, method), req, res);
      assert.equal(res.statusCode, 401, `${method.toUpperCase()} ${path}`);
      assert.equal(res.body.success, false);
    }
  }

  assert.equal(queryCount, 0);
});

test("alumni and admin are rejected before any student API database access", async () => {
  let queryCount = 0;
  pool.query = async () => {
    queryCount += 1;
    return { rows: [] };
  };

  for (const role of ["alumni", "admin"]) {
    for (const [router, path, method, body, params = {}] of protectedRoutes) {
      const req = {
        headers: { authorization: `Bearer ${tokenFor(23, role)}` },
        body,
        params,
      };
      const res = responseRecorder();
      await runChain(routeFor(router, path, method), req, res);
      assert.equal(res.statusCode, 403, `${role} ${method.toUpperCase()} ${path}`);
      assert.deepEqual(res.body, {
        success: false,
        message: "Student access required",
      });
    }
  }

  assert.equal(queryCount, 0);
});

test("route chains authenticate before checking that the role is student", async () => {
  for (const [router, path, method] of protectedRoutes) {
    const handlers = routeFor(router, path, method);
    assert.equal(handlers[0], authMiddleware);
    assert.equal(handlers[1], requireStudentRole);
  }
});

test("student application workflows preserve responses and bind ownership to the token", async () => {
  const calls = [];
  pool.query = async (query, values) => {
    calls.push({ query, values });
    if (query.includes("INSERT INTO applications")) {
      return { rows: [{ id: 501, student_id: 23, job_id: 91, status: "Applied" }] };
    }
    if (query.includes("WHERE a.id = $1 AND a.student_id = $2")) {
      return { rows: [] };
    }
    if (query.includes("WHERE student_id = $1 AND job_id = $2")) {
      return { rows: [] };
    }
    return { rows: [{ id: 501, student_id: 23, job_id: 91, status: "Applied" }] };
  };

  const listRes = responseRecorder();
  await runChain(routeFor(applicationRoutes, "/my", "get"), {
    headers: { authorization: `Bearer ${tokenFor(23, "student")}` },
    body: {},
    params: {},
  }, listRes);
  assert.equal(listRes.statusCode, 200);
  assert.deepEqual(listRes.body, {
    success: true,
    applications: [{ id: 501, student_id: 23, job_id: 91, status: "Applied" }],
  });
  assert.deepEqual(calls[0].values, [23]);
  assert.match(calls[0].query, /WHERE a\.student_id = \$1/);

  const createRes = responseRecorder();
  await runChain(routeFor(applicationRoutes, "/", "post"), {
    headers: { authorization: `Bearer ${tokenFor(23, "student")}` },
    body: { jobId: 91, student_id: 88 },
    params: {},
  }, createRes);
  assert.equal(createRes.statusCode, 201);
  assert.equal(createRes.body.success, true);
  assert.equal(createRes.body.application.student_id, 23);
  assert.deepEqual(calls[1].values, [23, 91]);
  assert.deepEqual(calls[2].values, [23, 91]);

  const otherStudentRes = responseRecorder();
  await runChain(routeFor(applicationRoutes, "/:id", "get"), {
    headers: { authorization: `Bearer ${tokenFor(23, "student")}` },
    body: {},
    params: { id: "401" },
  }, otherStudentRes);
  assert.equal(otherStudentRes.statusCode, 404);
  assert.equal(otherStudentRes.body.message, "Application not found");
  const detailQuery = calls.at(-1);
  assert.match(detailQuery.query, /WHERE a\.id = \$1 AND a\.student_id = \$2/);
  assert.deepEqual(detailQuery.values, ["401", 23]);
});

test("student profile read and update use the authenticated student ID", async () => {
  const calls = [];
  pool.query = async (query, values) => {
    calls.push({ query, values });
    return {
      rows: [{
        id: 23,
        full_name: "Test Student",
        email: "student@example.test",
        mobile: "0000000000",
        batch_year: 2026,
        department: "Engineering",
      }],
    };
  };

  const profileRes = responseRecorder();
  await runChain(routeFor(studentRoutes, "/profile", "get"), {
    headers: { authorization: `Bearer ${tokenFor(23, "student")}` },
    body: {},
    params: {},
  }, profileRes);
  assert.equal(profileRes.statusCode, 200);
  assert.equal(profileRes.body.success, true);
  assert.equal(profileRes.body.data.id, 23);
  assert.deepEqual(calls[0].values, [23]);

  const updateRes = responseRecorder();
  await runChain(routeFor(studentRoutes, "/profile", "put"), {
    headers: { authorization: `Bearer ${tokenFor(23, "student")}` },
    body: {
      id: 88,
      full_name: "Test Student",
      mobile: "0000000000",
      batch_year: 2026,
      department: "Engineering",
    },
    params: {},
  }, updateRes);
  assert.equal(updateRes.statusCode, 200);
  assert.equal(updateRes.body.success, true);
  assert.equal(updateRes.body.data.id, 23);
  assert.equal(updateRes.body.message, "Profile updated successfully");
  assert.deepEqual(calls[1].values, [23, "Test Student", "0000000000", 2026, "Engineering"]);
});

test("resume read and delete are scoped to the authenticated student", async () => {
  const calls = [];
  let destroyedPublicId;
  pool.query = async (query, values) => {
    calls.push({ query, values });
    if (query.includes("DELETE FROM student_resumes")) {
      return { rows: [{ id: 77, student_id: 23 }] };
    }
    return { rows: [{ id: 77, student_id: 23, file_name: "resume.pdf", public_id: "resume-23" }] };
  };
  cloudinary.uploader.destroy = async (publicId) => {
    destroyedPublicId = publicId;
    return { result: "ok" };
  };

  const resumeRes = responseRecorder();
  await runChain(routeFor(resumeRoutes, "/my", "get"), {
    headers: { authorization: `Bearer ${tokenFor(23, "student")}` },
    body: {},
    params: {},
  }, resumeRes);
  assert.equal(resumeRes.statusCode, 200);
  assert.equal(resumeRes.body.success, true);
  assert.equal(resumeRes.body.data.student_id, 23);
  assert.deepEqual(calls[0].values, [23]);
  assert.match(calls[0].query, /WHERE student_id = \$1/);

  const deleteRes = responseRecorder();
  await runChain(routeFor(resumeRoutes, "/my", "delete"), {
    headers: { authorization: `Bearer ${tokenFor(23, "student")}` },
    body: {},
    params: {},
  }, deleteRes);
  assert.equal(deleteRes.statusCode, 200);
  assert.equal(deleteRes.body.message, "Resume deleted successfully");
  assert.deepEqual(calls[1].values, [23]);
  assert.deepEqual(calls[2].values, [23]);
  assert.match(calls[2].query, /WHERE student_id = \$1/);
  assert.equal(destroyedPublicId, "resume-23");
});

test("a valid student resume upload retains PDF checks and token-derived ownership", async () => {
  const calls = [];
  pool.query = async (query, values) => {
    calls.push({ query, values });
    if (query.includes("INSERT INTO student_resumes")) {
      return { rows: [{ id: 77, student_id: 23, file_name: "resume.pdf" }] };
    }
    return { rows: [] };
  };
  cloudinary.uploader.upload_stream = (_options, callback) => ({
    end: (buffer) => {
      assert.ok(Buffer.isBuffer(buffer));
      callback(null, {
        secure_url: "https://files.example.test/resume.pdf",
        public_id: "resume-23",
      });
    },
  });

  const res = responseRecorder();
  await uploadResume({
    user: { id: 23, role: "student" },
    file: {
      mimetype: "application/pdf",
      size: 100,
      originalname: "resume.pdf",
      buffer: Buffer.from("pdf contents"),
    },
  }, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
    success: true,
    message: "Resume uploaded successfully",
    data: { id: 77, student_id: 23, file_name: "resume.pdf" },
  });
  assert.deepEqual(calls[0].values, [23]);
  assert.deepEqual(calls[1].values, [23, "resume.pdf", "https://files.example.test/resume.pdf", "resume-23"]);
});
