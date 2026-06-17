const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  createStudent,
  getStudentByEmail,
  getStudentById,
} = require("../models/studentModel");

const registerStudent = async (req, res) => {
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

    const existingStudent = await getStudentByEmail(email);

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await createStudent(
      registration_number,
      full_name,
      email,
      mobile,
      batch_year,
      department,
      hashedPassword
    );

    const { password: hiddenPassword, ...studentData } = student;

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: studentData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await getStudentByEmail(email);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: student.id,
        email: student.email,
        role: "student",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const { password: hiddenPassword, ...studentData } = student;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: studentData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStudentProfile = async (req, res) => {
  try {
    const student = await getStudentById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const { password: hiddenPassword, ...studentData } = student;

    res.status(200).json({
      success: true,
      data: studentData,
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
  registerStudent,
  loginStudent,
  getStudentProfile,
};