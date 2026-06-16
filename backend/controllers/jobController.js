const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../models/jobModel");

const createJobPost = async (req, res) => {
  try {
    const {
      company_name,
      job_title,
      job_description,
      location,
      salary_package,
      application_link,
    } = req.body;

    const job = await createJob(
      req.user.id,
      company_name,
      job_title,
      job_description,
      location,
      salary_package,
      application_link
    );

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchAllJobs = async (req, res) => {
  try {
    const jobs = await getAllJobs();

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchJobById = async (req, res) => {
  try {
    const job = await getJobById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateJobPost = async (req, res) => {
  try {
    const {
      company_name,
      job_title,
      job_description,
      location,
      salary_package,
      application_link,
    } = req.body;

    const job = await updateJob(
      req.params.id,
      company_name,
      job_title,
      job_description,
      location,
      salary_package,
      application_link
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteJobPost = async (req, res) => {
  try {
    const job = await deleteJob(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      data: job,
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
  createJobPost,
  fetchAllJobs,
  fetchJobById,
  updateJobPost,
  deleteJobPost,
};