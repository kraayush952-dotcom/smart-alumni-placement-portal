const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createInternshipValidation,
} = require("../validations/internshipValidation");

const validate = require(
  "../middleware/validationMiddleware"
);

const {
  createInternshipPost,
  fetchAllInternships,
  fetchInternshipById,
  updateInternshipPost,
} = require("../controllers/internshipController");

router.post(
  "/",
  authMiddleware,
  createInternshipValidation,
  validate,
  createInternshipPost
);

router.get(
  "/",
  fetchAllInternships
);

router.get(
  "/:id",
  fetchInternshipById
);

router.put(
  "/:id",
  authMiddleware,
  updateInternshipPost
);

module.exports = router;