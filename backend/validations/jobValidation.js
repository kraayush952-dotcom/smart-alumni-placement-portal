const { body } = require("express-validator");

const createJobValidation = [
  body("company_name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),

  body("job_title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required"),

  body("job_description")
    .trim()
    .isLength({ min: 10 })
    .withMessage(
      "Job description must be at least 10 characters"
    ),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  body("salary_package")
    .trim()
    .notEmpty()
    .withMessage("Salary package is required"),

  body("application_link")
    .trim()
    .isURL()
    .withMessage("Application link must be a valid URL"),
];

module.exports = {
  createJobValidation,
};