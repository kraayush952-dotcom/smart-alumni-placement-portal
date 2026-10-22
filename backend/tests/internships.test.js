const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");
const test = require("node:test");

process.env.JWT_SECRET = "internship-unit-test-secret";

const pool = require("../config/db");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const requireAlumniRole = require("../middleware/alumniMiddleware");
const validate = require("../middleware/validationMiddleware");
const adminRoutes = require("../routes/adminRoutes");
const internshipRoutes = require("../routes/internshipRoutes");

const originalQuery = pool.query;

test.afterEach(() => {
  pool.query = originalQuery;
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

const validInternship = {
  company_name: "Example Co",
  internship_title: "Software Engineering Intern",
  internship_description: "Build and maintain reliable software products.",
  duration: "12 weeks",
  stipend: "Paid",
  application_link: "https://example.com/apply",
};

const requestFor = (role, { id = 7, body = {}, params = {}, query = {} } = {}) => ({
  headers: { authorization: `Bearer ${tokenFor(id, role)}` },
  user: undefined,
  body,
  params,
  query,
});

test("internship mutations require a valid token and alumni role before database access", async () => {
  let queryCount = 0;
  pool.query = async () => {
    queryCount += 1;
    return { rows: [] };
  };

  const cases = [
    ["post", "/", { ...validInternship }],
    ["put", "/:id", { ...validInternship }, { id: "41" }],
  ];

  for (const [method, path, body, params = {}] of cases) {
    for (const authorization of [undefined, "Bearer invalid-token"]) {
      const req = { headers: {}, body, params, query: {} };
      if (authorization) req.headers.authorization = authorization;
      const res = responseRecorder();
      await runChain(routeFor(internshipRoutes, path, method), req, res);
      assert.equal(res.statusCode, 401);
    }

    for (const role of ["student", "admin"]) {
      const req = requestFor(role, { body, params });
      const res = responseRecorder();
      await runChain(routeFor(internshipRoutes, path, method), req, res);
      assert.equal(res.statusCode, 403, `${role} ${method.toUpperCase()} ${path}`);
      assert.equal(res.body.message, "Alumni access required");
    }
  }

  assert.equal(queryCount, 0);
});

test("alumni creation derives alumni_id from the token and preserves the response envelope", async () => {
  let queryCall;
  pool.query = async (query, values) => {
    queryCall = { query, values };
    return { rows: [{ id: 31, alumni_id: 7, ...validInternship }] };
  };

  const req = requestFor("alumni", {
    body: { ...validInternship, alumni_id: 999 },
  });
  const res = responseRecorder();
  await runChain(routeFor(internshipRoutes, "/", "post"), req, res);

  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.body, {
    success: true,
    message: "Internship posted successfully",
    data: { id: 31, alumni_id: 7, ...validInternship },
  });
  assert.deepEqual(queryCall.values, [
    7,
    validInternship.company_name,
    validInternship.internship_title,
    validInternship.internship_description,
    validInternship.duration,
    validInternship.stipend,
    validInternship.application_link,
  ]);
});

test("create and update reject malformed payloads and invalid update IDs before database access", async () => {
  let queryCount = 0;
  pool.query = async () => {
    queryCount += 1;
    return { rows: [] };
  };

  const invalidBody = { ...validInternship, application_link: "not-a-url" };
  for (const [method, path, body, params] of [
    ["post", "/", invalidBody, {}],
    ["put", "/:id", invalidBody, { id: "41" }],
    ["put", "/:id", validInternship, { id: "not-an-id" }],
  ]) {
    const req = requestFor("alumni", { body, params });
    const res = responseRecorder();
    await runChain(routeFor(internshipRoutes, path, method), req, res);
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.message, "Validation failed");
  }

  assert.equal(queryCount, 0);
});

test("an alumni owner can update an internship using an owner-scoped SQL update", async () => {
  const calls = [];
  pool.query = async (query, values) => {
    calls.push({ query, values });
    if (query.includes("SELECT") && query.includes("FROM internships")) {
      return { rows: [{ id: 41, alumni_id: "7" }] };
    }
    return { rows: [{ id: 41, alumni_id: 7, ...validInternship }] };
  };

  const req = requestFor("alumni", {
    body: validInternship,
    params: { id: "41" },
  });
  const res = responseRecorder();
  await runChain(routeFor(internshipRoutes, "/:id", "put"), req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
    success: true,
    message: "Internship updated successfully",
    data: { id: 41, alumni_id: 7, ...validInternship },
  });
  assert.deepEqual(calls[1].values, [
    "41",
    7,
    validInternship.company_name,
    validInternship.internship_title,
    validInternship.internship_description,
    validInternship.duration,
    validInternship.stipend,
    validInternship.application_link,
  ]);
  assert.match(calls[1].query, /WHERE id = \$1\s+AND alumni_id = \$2/);
});

test("another alumni cannot edit the internship and missing rows return 404", async () => {
  let updateCalled = false;
  pool.query = async (query) => {
    if (query.includes("SELECT") && query.includes("FROM internships")) {
      return { rows: [{ id: 41, alumni_id: 8 }] };
    }
    updateCalled = true;
    return { rows: [] };
  };

  const otherOwner = responseRecorder();
  await runChain(routeFor(internshipRoutes, "/:id", "put"), requestFor("alumni", {
    body: validInternship,
    params: { id: "41" },
  }), otherOwner);
  assert.equal(otherOwner.statusCode, 403);
  assert.equal(updateCalled, false);

  pool.query = async () => ({ rows: [] });
  const missing = responseRecorder();
  await runChain(routeFor(internshipRoutes, "/:id", "put"), requestFor("alumni", {
    body: validInternship,
    params: { id: "404" },
  }), missing);
  assert.equal(missing.statusCode, 404);
  assert.equal(missing.body.message, "Internship not found");
});

test("database errors return safe mutation errors without exposing database details", async () => {
  const originalConsoleError = console.error;
  console.error = () => {};
  try {
    pool.query = async () => {
      throw Object.assign(new Error("sensitive database detail"), { code: "XX001" });
    };

    const createRes = responseRecorder();
    await runChain(routeFor(internshipRoutes, "/", "post"), requestFor("alumni", {
      body: validInternship,
    }), createRes);
    assert.equal(createRes.statusCode, 500);
    assert.deepEqual(createRes.body, {
      success: false,
      message: "Unable to create internship",
    });

    const updateRes = responseRecorder();
    await runChain(routeFor(internshipRoutes, "/:id", "put"), requestFor("alumni", {
      body: validInternship,
      params: { id: "41" },
    }), updateRes);
    assert.equal(updateRes.statusCode, 500);
    assert.deepEqual(updateRes.body, {
      success: false,
      message: "Unable to update internship",
    });
  } finally {
    console.error = originalConsoleError;
  }
});

test("public student browsing remains available and admin listing remains admin-only", async () => {
  const publicList = routeFor(internshipRoutes, "/", "get");
  assert.equal(publicList.length, 1);
  assert.equal(publicList[0].name, "fetchAllInternships");

  const adminList = routeFor(adminRoutes, "/internships", "get");
  assert.equal(adminList[0], adminMiddleware);

  let queryCount = 0;
  pool.query = async (query) => {
    queryCount += 1;
    if (query.includes("COUNT(*)")) return { rows: [{ total: "1" }] };
    return { rows: [{ id: 31, status: "ACTIVE", application_link: "https://example.com/apply" }] };
  };

  const publicRes = responseRecorder();
  await runChain(publicList, { query: {}, body: {}, params: {} }, publicRes);
  assert.equal(publicRes.statusCode, 200);
  assert.equal(publicRes.body.success, true);
  assert.equal(publicRes.body.data[0].application_link, "https://example.com/apply");
  assert.equal(queryCount, 2);

  const deniedAdminList = responseRecorder();
  await runChain(adminList, requestFor("student"), deniedAdminList);
  assert.equal(deniedAdminList.statusCode, 403);
  assert.equal(deniedAdminList.body.message, "Admin access only.");
  assert.equal(queryCount, 2);
});
