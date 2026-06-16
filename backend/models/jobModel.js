const pool = require("../config/db");

const createJob = async (
  alumniId,
  company_name,
  job_title,
  job_description,
  location,
  salary_package,
  application_link
) => {
  const query = `
    INSERT INTO jobs
    (
      alumni_id,
      company_name,
      job_title,
      job_description,
      location,
      salary_package,
      application_link
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    alumniId,
    company_name,
    job_title,
    job_description,
    location,
    salary_package,
    application_link,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getAllJobs = async () => {
  const result = await pool.query(
    "SELECT * FROM jobs ORDER BY created_at DESC"
  );

  return result.rows;
};

const getJobById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM jobs WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
};