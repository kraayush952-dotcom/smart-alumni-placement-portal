const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createJobPost,
  fetchAllJobs,
  fetchJobById,
  updateJobPost,
  deleteJobPost,
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

router.put(
  "/:id",
  authMiddleware,
  updateJobPost
);

router.delete(
  "/:id",
  authMiddleware,
  deleteJobPost
);

module.exports = router;