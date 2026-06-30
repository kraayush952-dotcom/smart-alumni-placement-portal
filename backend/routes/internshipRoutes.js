const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createInternshipPost,
  fetchAllInternships,
  fetchInternshipById,
  updateInternshipPost,
} = require("../controllers/internshipController");

router.post(
  "/",
  authMiddleware,
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