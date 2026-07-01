const {
  createInternship,
  getAllInternships,
  getTotalInternships,
  searchInternships,
  getInternshipById,
  getInternshipOwner,
  updateInternship,
  getAllInternshipsForAdmin,
  getInternshipDetailsForAdmin,
  updateInternshipStatus,
} = require("../models/internshipModel");

const createInternshipPost = async (req, res) => {
  try {
    const {
      company_name,
      internship_title,
      internship_description,
      duration,
      stipend,
      application_link,
    } = req.body;

    const internship = await createInternship(
      req.user.id,
      company_name,
      internship_title,
      internship_description,
      duration,
      stipend,
      application_link
    );

    res.status(201).json({
      success: true,
      message: "Internship posted successfully",
      data: internship,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchAllInternships = async (req, res) => {
  try {
    const { search } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let internships;
    let total;

    if (search) {
      internships = await searchInternships(search);
      total = internships.length;
    } else {
      internships = await getAllInternships(page, limit);
      total = await getTotalInternships();
    }

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      count: internships.length,
      data: internships,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchInternshipById = async (req, res) => {
  try {
    const internship = await getInternshipById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      data: internship,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateInternshipPost = async (req, res) => {
  try {
    const {
      company_name,
      internship_title,
      internship_description,
      duration,
      stipend,
      application_link,
    } = req.body;

    const internshipOwner =
      await getInternshipOwner(req.params.id);

    if (!internshipOwner) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    if (internshipOwner.alumni_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to update this internship",
      });
    }

    const internship = await updateInternship(
      req.params.id,
      company_name,
      internship_title,
      internship_description,
      duration,
      stipend,
      application_link
    );

    res.status(200).json({
      success: true,
      message: "Internship updated successfully",
      data: internship,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdminInternships = async (req, res) => {
  try {
    const internships =
      await getAllInternshipsForAdmin();

    res.status(200).json({
      success: true,
      count: internships.length,
      data: internships,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdminInternshipDetails = async (
  req,
  res
) => {
  try {
    const internship =
      await getInternshipDetailsForAdmin(
        req.params.id
      );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      data: internship,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAdminInternshipStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "ACTIVE",
      "ARCHIVED",
      "EXPIRED",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be ACTIVE, ARCHIVED or EXPIRED",
      });
    }

    const internship =
      await updateInternshipStatus(
        req.params.id,
        status
      );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Internship status updated successfully",
      data: internship,
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
  createInternshipPost,
  fetchAllInternships,
  fetchInternshipById,
  updateInternshipPost,

  getAdminInternshipDetails,
  getAdminInternships,
  updateAdminInternshipStatus,
};