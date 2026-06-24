const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  sendMentorshipRequest,
  getMyRequests,
  updateRequestStatus,
} = require("../controllers/mentorshipController");

router.post(
  "/request",
  authMiddleware,
  sendMentorshipRequest
);

router.get(
  "/my-requests",
  authMiddleware,
  getMyRequests
);

router.put(
  "/:id",
  authMiddleware,
  updateRequestStatus
);

module.exports = router;