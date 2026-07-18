const pool = require("../config/db");

const createStudent = async (
  registration_number,
  full_name,
  email,
  mobile,
  batch_year,
  department,
  password
) => {
  const query = `
    INSERT INTO students
    (
      registration_number,
      full_name,
      email,
      mobile,
      batch_year,
      department,
      password
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
  `;

  const values = [
    registration_number,
    full_name,
    email,
    mobile,
    batch_year,
    department,
    password,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getStudentByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM students WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

const getStudentByMobile = async (mobile) => {
  const result = await pool.query(
    "SELECT * FROM students WHERE mobile = $1",
    [mobile]
  );

  return result.rows[0];
};

const getStudentById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM students WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createStudent,
  getStudentByEmail,
  getStudentByMobile,
  getStudentById,
};