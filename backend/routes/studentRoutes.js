const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const requireStudentRole = require("../middleware/studentMiddleware");

const {
  registerStudent,
  loginStudent,
  getStudentProfile,
  updateStudentProfileController,
} = require("../controllers/studentController");

router.post(
  "/register",
  registerStudent
);

router.post(
  "/login",
  loginStudent
);

router.get(
  "/profile",
  authMiddleware,
  requireStudentRole,
  getStudentProfile
);

router.put(
  "/profile",
  authMiddleware,
  requireStudentRole,
  updateStudentProfileController
);

module.exports = router;
