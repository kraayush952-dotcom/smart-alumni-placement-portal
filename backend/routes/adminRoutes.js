const express = require("express");

const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");

const {
  loginAdmin,
  getDashboard,
} = require("../controllers/adminController");

router.post(
  "/login",
  loginAdmin
);

router.get(
  "/dashboard",
  adminMiddleware,
  getDashboard
);

module.exports = router;