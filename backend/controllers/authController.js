const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  createAlumni,
  getAlumniByEmail,
  getAlumniByMobile,
  getProfileByAlumniId,
  updateProfile,
} = require("../models/alumniModel");

const {
  createStudent,
  getStudentByEmail,
  getStudentByMobile,
} = require("../models/studentModel");

const {
  getAdminByEmail,
} = require("../models/adminModel");

const register = async (req, res) => {
  try {
    const {
      role,
      registration_number,
      full_name,
      email,
      mobile,
      batch_year,
      department,
      password,
    } = req.body;

    let existingEmail = null;
    let existingMobile = null;

    if (role === "Student") {
      existingEmail = await getStudentByEmail(email);
      existingMobile = await getStudentByMobile(mobile);
    } else if (role === "Alumni") {
      existingEmail = await getAlumniByEmail(email);
      existingMobile = await getAlumniByMobile(mobile);
    }

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    if (existingMobile) {
      return res.status(409).json({
        success: false,
        message: "Mobile number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;

    switch (role) {
      case "Student":
        user = await createStudent(
          registration_number,
          full_name,
          email,
          mobile,
          batch_year,
          department,
          hashedPassword
        );
        break;

      case "Alumni":
        user = await createAlumni(
          registration_number,
          full_name,
          email,
          mobile,
          batch_year,
          department,
          hashedPassword
        );
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid role",
        });
    }

    const { password: hiddenPassword, ...userData } = user;

    res.status(201).json({
      success: true,
      message: `${role} registered successfully`,
      data: userData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user = null;
    let userRole = "";

    switch (role) {
      case "Student":
        user = await getStudentByEmail(email);
        userRole = "student";
        break;

      case "Alumni":
        user = await getAlumniByEmail(email);
        userRole = "alumni";
        break;

      case "Admin":
        user = await getAdminByEmail(email);
        userRole = "admin";
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid role",
        });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `${role} not found`,
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: userRole,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const { password: hiddenPassword, ...userData } = user;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: userData,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await getProfileByAlumniId(req.user.id);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAlumniProfile = async (req, res) => {
  try {
    const {
      current_company,
      designation,
      location,
      linkedin_url,
      skills,
      bio,
      mentorship_available,
      profile_photo,
    } = req.body;

    const profile = await updateProfile(
      req.user.id,
      current_company,
      designation,
      location,
      linkedin_url,
      skills,
      bio,
      mentorship_available,
      profile_photo
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
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
  register,
  login,
  getProfile,
  updateAlumniProfile,
};