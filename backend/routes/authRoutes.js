const express = require("express");

const router = express.Router();

const {
  registerAlumni,
  loginAlumni,
} = require("../controllers/authController");

router.post("/register", registerAlumni);
router.post("/login", loginAlumni);

module.exports = router;