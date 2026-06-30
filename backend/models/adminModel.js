const pool = require("../config/db");

const getAdminByEmail = async (email) => {
  const result = await pool.query(
    `
    SELECT *
    FROM admin_users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
};

const getDashboardStats = async () => {
  const result = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM students) AS total_students,
      (SELECT COUNT(*) FROM alumni_master) AS total_alumni,
      (SELECT COUNT(*) FROM jobs) AS total_jobs,
      (SELECT COUNT(*) FROM internships) AS total_internships,
      (SELECT COUNT(*) FROM mentorship_requests) AS total_mentorship_requests;
  `);

  return result.rows[0];
};

const getAllStudents = async () => {
  const result = await pool.query(`
    SELECT
      id,
      registration_number,
      full_name,
      email,
      mobile,
      batch_year,
      department,
      is_verified,
      created_at
    FROM students
    ORDER BY created_at DESC;
  `);

  return result.rows;
};

const getStudentById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      id,
      registration_number,
      full_name,
      email,
      mobile,
      batch_year,
      department,
      is_verified,
      created_at
    FROM students
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

const getAllAlumni = async () => {
  const result = await pool.query(`
    SELECT
      am.id,
      am.registration_number,
      am.full_name,
      am.email,
      am.mobile,
      am.batch_year,
      am.department,
      am.is_verified,
      am.created_at,
      ap.current_company,
      ap.designation,
      ap.location,
      ap.mentorship_available
    FROM alumni_master am
    LEFT JOIN alumni_profiles ap
      ON am.id = ap.alumni_id
    ORDER BY am.created_at DESC;
  `);

  return result.rows;
};

const getAlumniById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      am.id,
      am.registration_number,
      am.full_name,
      am.email,
      am.mobile,
      am.batch_year,
      am.department,
      am.is_verified,
      am.created_at,
      ap.current_company,
      ap.designation,
      ap.location,
      ap.linkedin_url,
      ap.skills,
      ap.bio,
      ap.mentorship_available,
      ap.profile_photo
    FROM alumni_master am
    LEFT JOIN alumni_profiles ap
      ON am.id = ap.alumni_id
    WHERE am.id = $1
    `,
    [id]
  );

  return result.rows[0];
};

const getAllJobsForAdmin = async () => {
  const result = await pool.query(`
    SELECT
      j.id,
      j.company_name,
      j.job_title,
      j.location,
      j.salary_package,
      j.status,
      j.created_at,
      am.full_name AS posted_by,
      am.email AS alumni_email
    FROM jobs j
    JOIN alumni_master am
      ON j.alumni_id = am.id
    ORDER BY j.created_at DESC;
  `);

  return result.rows;
};

const getJobDetailsForAdmin = async (id) => {
  const result = await pool.query(
    `
    SELECT
      j.id,
      j.company_name,
      j.job_title,
      j.job_description,
      j.location,
      j.salary_package,
      j.application_link,
      j.status,
      j.created_at,

      am.id AS alumni_id,
      am.full_name,
      am.email,
      am.mobile,
      am.batch_year,
      am.department,

      ap.current_company,
      ap.designation,
      ap.linkedin_url

    FROM jobs j

    JOIN alumni_master am
      ON j.alumni_id = am.id

    LEFT JOIN alumni_profiles ap
      ON am.id = ap.alumni_id

    WHERE j.id = $1;
    `,
    [id]
  );

  return result.rows[0];
};

const updateJobStatusForAdmin = async (
  id,
  status
) => {
  const result = await pool.query(
    `
    UPDATE jobs
    SET status = $2
    WHERE id = $1
    RETURNING *;
    `,
    [id, status]
  );

  return result.rows[0];
};

const verifyAlumni = async (id, isVerified) => {
  const result = await pool.query(
    `
    UPDATE alumni_master
    SET is_verified = $2
    WHERE id = $1
    RETURNING
      id,
      registration_number,
      full_name,
      email,
      is_verified;
    `,
    [id, isVerified]
  );

  return result.rows[0];
};

module.exports = {
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
};