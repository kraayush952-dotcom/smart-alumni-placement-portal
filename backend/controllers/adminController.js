const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  getAdminByEmail,
  getDashboardStats,
  getAllStudents,
  getStudentById,
  getAllAlumni,
  getAlumniById,
  verifyAlumni,
  getAllJobsForAdmin,
  getJobDetailsForAdmin,
  updateJobStatusForAdmin,
} = require("../models/adminModel");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await getAdminByEmail(email);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      data: {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStudent = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAlumni = async (req, res) => {
  try {
    const alumni = await getAllAlumni();

    res.status(200).json({
      success: true,
      count: alumni.length,
      data: alumni,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAlumniDetails = async (req, res) => {
  try {
    const alumni = await getAlumniById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found",
      });
    }

    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAlumniVerification = async (req, res) => {
  try {
    const { is_verified } = req.body;

    if (typeof is_verified !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "is_verified must be true or false",
      });
    }

    const alumni = await verifyAlumni(
      req.params.id,
      is_verified
    );

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found",
      });
    }

    res.status(200).json({
      success: true,
      message: is_verified
        ? "Alumni verified successfully"
        : "Alumni verification removed",
      data: alumni,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdminJobs = async (req, res) => {
  try {
    const jobs = await getAllJobsForAdmin();

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

const getAdminJobDetails = async (req, res) => {
  try {
    const job = await getJobDetailsForAdmin(
      req.params.id
    );

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

const updateAdminJobStatus = async (req, res) => {
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

    const job = await updateJobStatusForAdmin(
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
  loginAdmin,
  getDashboard,
  getStudents,
  getStudent,
  getAlumni,
  getAlumniDetails,
  updateAlumniVerification,
  getAdminJobs,
  getAdminJobDetails,
  updateAdminJobStatus,
};