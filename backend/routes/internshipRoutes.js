const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const requireAlumniRole = require("../middleware/alumniMiddleware");
const { param } = require("express-validator");

const {
  createInternshipValidation,
  updateInternshipValidation,
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
  requireAlumniRole,
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
  requireAlumniRole,
  param("id")
    .isInt({ min: 1 })
    .withMessage("Internship ID must be a positive integer"),
  updateInternshipValidation,
  validate,
  updateInternshipPost
);

module.exports = router;
