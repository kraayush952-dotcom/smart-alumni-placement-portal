const { body } = require("express-validator");

const registerValidation = [
  body("registration_number")
    .trim()
    .notEmpty()
    .withMessage("Registration number is required"),

  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("mobile")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits"),

  body("batch_year")
    .notEmpty()
    .withMessage("Batch year is required")
    .isInt({ min: 2000, max: 2100 })
    .withMessage("Batch year is invalid"),

  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage(
      "Password must be at least 8 characters"
    ),
];

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

module.exports = {
  registerValidation,
  loginValidation,
};