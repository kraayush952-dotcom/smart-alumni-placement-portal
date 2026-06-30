const express = require("express");

const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");

const {
  loginAdmin,
  getDashboard,
  getStudents,
  getStudent,
  getAlumni,
  getAlumniDetails,
  updateAlumniVerification,
  getAdminJobs,
  getAdminJobDetails,
  updateAdminJobStatus,
} = require("../controllers/adminController");

router.post(
  "/login",
  loginAdmin
);

router.get(
  "/dashboard",
  adminMiddleware,
  getDashboard
);

router.get(
  "/students",
  adminMiddleware,
  getStudents
);

router.get(
  "/students/:id",
  adminMiddleware,
  getStudent
);

router.get(
  "/alumni",
  adminMiddleware,
  getAlumni
);

router.get(
  "/alumni/:id",
  adminMiddleware,
  getAlumniDetails
);

router.patch(
  "/alumni/:id/verify",
  adminMiddleware,
  updateAlumniVerification
);

router.get(
  "/jobs",
  adminMiddleware,
  getAdminJobs
);

router.get(
  "/jobs/:id",
  adminMiddleware,
  getAdminJobDetails
);

router.patch(
  "/jobs/:id/status",
  adminMiddleware,
  updateAdminJobStatus
);

module.exports = router;