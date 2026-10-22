const cloudinary = require("../config/cloudinary");
const {
  createOrUpdateResume,
  getResumeByStudentId,
  deleteResumeByStudentId,
} = require("../models/resumeModel");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume",
      });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume size must be less than 5MB",
      });
    }

    const existingResume = await getResumeByStudentId(req.user.id);

    if (existingResume?.public_id) {
      await cloudinary.uploader.destroy(existingResume.public_id, {
        resource_type: "raw",
      });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "student-resumes",
          resource_type: "raw",
          public_id: `student_${req.user.id}_${Date.now()}`,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    const resume = await createOrUpdateResume(
      req.user.id,
      req.file.originalname,
      uploadResult.secure_url,
      uploadResult.public_id
    );

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      data: resume,
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload resume",
    });
  }
};

const getMyResume = async (req, res) => {
  try {
    const resume = await getResumeByStudentId(req.user.id);

    return res.status(200).json({
      success: true,
      data: resume || null,
    });
  } catch (error) {
    console.error("Get resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
    });
  }
};

const deleteMyResume = async (req, res) => {
  try {
    const resume = await getResumeByStudentId(req.user.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    if (resume.public_id) {
      await cloudinary.uploader.destroy(resume.public_id, {
        resource_type: "raw",
      });
    }

    await deleteResumeByStudentId(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resume",
    });
  }
};

module.exports = {
  uploadResume,
  getMyResume,
  deleteMyResume,
};