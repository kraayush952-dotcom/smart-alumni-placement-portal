const pool = require("../config/db");

// Create a new application
const createApplication = async (studentId, jobId) => {
  const query = `
    INSERT INTO applications (student_id, job_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [studentId, jobId]);
  return rows[0];
};

// Check if student already applied
const findApplication = async (studentId, jobId) => {
  const query = `
    SELECT *
    FROM applications
    WHERE student_id = $1 AND job_id = $2;
  `;

  const { rows } = await pool.query(query, [studentId, jobId]);
  return rows[0];
};

// Get all applications of a student
const getApplicationsByStudent = async (studentId) => {
  const query = `
    SELECT
      a.id,
      a.student_id,
      a.job_id,
      a.status,
      a.applied_at,
      a.updated_at,
      j.company_name,
      j.job_title,
      j.location,
      j.salary_package
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.student_id = $1
    ORDER BY a.applied_at DESC;
  `;

  const { rows } = await pool.query(query, [studentId]);
  return rows;
};

// Get single application of a student
const getApplicationById = async (applicationId, studentId) => {
  const query = `
    SELECT
      a.id,
      a.student_id,
      a.job_id,
      a.status,
      a.applied_at,
      a.updated_at,
      j.company_name,
      j.job_title,
      j.job_description,
      j.location,
      j.salary_package,
      j.application_link
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.id = $1 AND a.student_id = $2;
  `;

  const { rows } = await pool.query(query, [applicationId, studentId]);
  return rows[0];
};

module.exports = {
  createApplication,
  findApplication,
  getApplicationsByStudent,
  getApplicationById,
};