const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  updateJobStatus,
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

const updateJobStatusController = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    if (
      status !== "ACTIVE" &&
      status !== "ARCHIVED" &&
      status !== "EXPIRED"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be ACTIVE, ARCHIVED or EXPIRED",
      });
    }

    const job = await updateJobStatus(
      req.params.id,
      status
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job status updated successfully",
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
  updateJobStatusController,
};