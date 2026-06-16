const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  registerAlumni,
  loginAlumni,
} = require("../controllers/authController");

router.post("/register", registerAlumni);
router.post("/login", loginAlumni);

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

module.exports = router;