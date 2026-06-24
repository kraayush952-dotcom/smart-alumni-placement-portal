const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  createAlumni,
  getAlumniByEmail,
  getProfileByAlumniId,
  updateProfile,
} = require("../models/alumniModel");

const registerAlumni = async (req, res) => {
  try {
    const {
      registration_number,
      full_name,
      email,
      mobile,
      batch_year,
      department,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const alumni = await createAlumni(
      registration_number,
      full_name,
      email,
      mobile,
      batch_year,
      department,
      hashedPassword
    );

    const { password: hiddenPassword, ...alumniData } = alumni;

    res.status(201).json({
      success: true,
      message: "Alumni registered successfully",
      data: alumniData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginAlumni = async (req, res) => {
  try {
    const { email, password } = req.body;

    const alumni = await getAlumniByEmail(email);

    console.log("ALUMNI DATA:", alumni);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      alumni.password
    );

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: alumni.id,
        email: alumni.email,
        role: "alumni",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const { password: hiddenPassword, ...alumniData } = alumni;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: alumniData,
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
  registerAlumni,
  loginAlumni,
  getProfile,
  updateAlumniProfile,
};