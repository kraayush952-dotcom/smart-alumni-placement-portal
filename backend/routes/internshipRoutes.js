const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createInternshipPost,
  fetchAllInternships,
  fetchInternshipById,
  updateInternshipPost,
  deleteInternshipPost,
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

router.delete(
  "/:id",
  authMiddleware,
  deleteInternshipPost
);

module.exports = router;