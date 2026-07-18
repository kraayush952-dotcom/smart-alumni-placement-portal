const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  registerValidation,
  loginValidation,
} = require("../validations/authValidation");

const validate = require(
  "../middleware/validationMiddleware"
);

const {
  register,
  login,
  getProfile,
  updateAlumniProfile,
} = require("../controllers/authController");

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

router.post(
  "/login",
  loginValidation,
  validate,
  login
);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateAlumniProfile
);

module.exports = router;