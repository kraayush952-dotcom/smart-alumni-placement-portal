const {
  createJob,
  getAllJobs,
  getTotalJobs,
  searchJobs,
  getJobById,
  getJobOwner,
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
    const { search } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let jobs;
    let total;

    if (search) {
      jobs = await searchJobs(search);
      total = jobs.length;
    } else {
      jobs = await getAllJobs(page, limit);
      total = await getTotalJobs();
    }

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
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

    const jobOwner = await getJobOwner(
      req.params.id
    );

    if (!jobOwner) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (jobOwner.alumni_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to update this job",
      });
    }

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