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
    } = req.body;

    const alumni = await createAlumni(
      registration_number,
      full_name,
      email,
      mobile,
      batch_year,
      department
    );

    res.status(201).json({
      success: true,
      message: "Alumni registered successfully",
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

module.exports = {
  registerAlumni,
};