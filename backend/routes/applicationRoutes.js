const express = require("express");
const {
  applyForJob,
  getMyApplications,
  getMyApplicationById,
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const requireStudentRole = require("../middleware/studentMiddleware");

const router = express.Router();

// Student applies for a job
router.post("/", authMiddleware, requireStudentRole, applyForJob);

// Get logged-in student's applications
router.get("/my", authMiddleware, requireStudentRole, getMyApplications);

// Get single application
router.get("/:id", authMiddleware, requireStudentRole, getMyApplicationById);

module.exports = router;
