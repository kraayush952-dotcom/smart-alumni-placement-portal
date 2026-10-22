const {
  createApplication,
  findApplication,
  getApplicationsByStudent,
  getApplicationById,
} = require("../models/applicationModel");

// Apply for a job
const applyForJob = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    const existingApplication = await findApplication(studentId, jobId);

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await createApplication(studentId, jobId);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

// Get logged-in student's applications
const getMyApplications = async (req, res, next) => {
  try {
    const studentId = req.user.id;

    const applications = await getApplicationsByStudent(studentId);

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// Get single application
const getMyApplicationById = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;

    const application = await getApplicationById(id, studentId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getMyApplicationById,
};