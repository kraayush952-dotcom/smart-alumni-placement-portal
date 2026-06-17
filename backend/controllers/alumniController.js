const {
  getAllAlumni,
  getAlumniById,
} = require("../models/alumniModel");

const fetchAllAlumni = async (req, res) => {
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

const fetchAlumniById = async (req, res) => {
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

module.exports = {
  fetchAllAlumni,
  fetchAlumniById,
};