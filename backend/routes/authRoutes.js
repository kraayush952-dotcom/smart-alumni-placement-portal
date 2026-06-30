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
  registerAlumni,
  loginAlumni,
  getProfile,
  updateAlumniProfile,
} = require("../controllers/authController");

router.post(
  "/register",
  registerValidation,
  validate,
  registerAlumni
);

router.post(
  "/login",
  loginValidation,
  validate,
  loginAlumni
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