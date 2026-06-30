const { body } = require("express-validator");

const createInternshipValidation = [
  body("company_name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),

  body("internship_title")
    .trim()
    .notEmpty()
    .withMessage("Internship title is required"),

  body("internship_description")
    .trim()
    .isLength({ min: 10 })
    .withMessage(
      "Internship description must be at least 10 characters"
    ),

  body("duration")
    .trim()
    .notEmpty()
    .withMessage("Duration is required"),

  body("stipend")
    .trim()
    .notEmpty()
    .withMessage("Stipend is required"),

  body("application_link")
    .trim()
    .isURL()
    .withMessage("Application link must be a valid URL"),
];

module.exports = {
  createInternshipValidation,
};