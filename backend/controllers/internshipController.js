const {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
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
    const internships = await getAllInternships();

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

const deleteInternshipPost = async (req, res) => {
  try {
    const internship = await deleteInternship(req.params.id);

    res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
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
  deleteInternshipPost,
};