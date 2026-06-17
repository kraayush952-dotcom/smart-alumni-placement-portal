const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  registerStudent,
  loginStudent,
  getStudentProfile,
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
  getStudentProfile
);

module.exports = router;