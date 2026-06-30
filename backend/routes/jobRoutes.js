const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createJobValidation,
} = require("../validations/jobValidation");

const validate = require(
  "../middleware/validationMiddleware"
);

const {
  createJobPost,
  fetchAllJobs,
  fetchJobById,
  updateJobPost,
} = require("../controllers/jobController");

router.post(
  "/",
  authMiddleware,
  createJobValidation,
  validate,
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

module.exports = router;