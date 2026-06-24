const {
  createMentorshipRequest,
  getMentorshipRequestsByAlumni,
  updateMentorshipStatus,
} = require("../models/mentorshipModel");

const sendMentorshipRequest = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can send mentorship requests",
      });
    }

    const { alumni_id, message } = req.body;

    const request = await createMentorshipRequest(
      req.user.id,
      alumni_id,
      message
    );

    res.status(201).json({
      success: true,
      message: "Mentorship request sent successfully",
      data: request,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyRequests = async (req, res) => {
  try {
    if (req.user.role !== "alumni") {
      return res.status(403).json({
        success: false,
        message: "Only alumni can view mentorship requests",
      });
    }

    const requests =
      await getMentorshipRequestsByAlumni(
        req.user.id
      );

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    if (req.user.role !== "alumni") {
      return res.status(403).json({
        success: false,
        message: "Only alumni can update requests",
      });
    }

    const { status } = req.body;

    if (
      status !== "accepted" &&
      status !== "rejected"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be accepted or rejected",
      });
    }

    const request =
      await updateMentorshipStatus(
        req.params.id,
        status
      );

    res.status(200).json({
      success: true,
      message: "Request updated successfully",
      data: request,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMentorshipRequest,
  getMyRequests,
  updateRequestStatus,
};