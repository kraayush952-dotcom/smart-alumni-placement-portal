const express = require("express");

const router = express.Router();

const {
  fetchAllAlumni,
  fetchAlumniById,
} = require("../controllers/alumniController");

router.get(
  "/",
  fetchAllAlumni
);

router.get(
  "/:id",
  fetchAlumniById
);

module.exports = router;