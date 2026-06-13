const bcrypt = require("bcryptjs");
const { createAlumni } = require("../models/alumniModel");

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

    const { password: hashedPasswordField, ...alumniData } = alumni;

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

module.exports = {
  registerAlumni,
};