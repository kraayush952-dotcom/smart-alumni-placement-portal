const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const requireStudentRole = require("../middleware/studentMiddleware");

const {
  uploadResume,
  getMyResume,
  deleteMyResume,
} = require("../controllers/resumeController");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  authMiddleware,
  requireStudentRole,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/my",
  authMiddleware,
  requireStudentRole,
  getMyResume
);

router.delete(
  "/my",
  authMiddleware,
  requireStudentRole,
  deleteMyResume
);

module.exports = router;
