const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createJobPost,
  fetchAllJobs,
  fetchJobById,
} = require("../controllers/jobController");

router.post(
  "/",
  authMiddleware,
  createJobPost
);

router.get(
  "/",
  fetchAllJobs
);

router.get(
  "/:id",
  fetchJobById
);

module.exports = router;