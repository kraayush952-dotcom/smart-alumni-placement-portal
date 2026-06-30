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

const getJobOwner = async (id) => {
  const result = await pool.query(
    `
    SELECT
      id,
      alumni_id
    FROM jobs
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

const updateJob = async (
  id,
  company_name,
  job_title,
  job_description,
  location,
  salary_package,
  application_link
) => {
  const query = `
    UPDATE jobs
    SET
      company_name = $2,
      job_title = $3,
      job_description = $4,
      location = $5,
      salary_package = $6,
      application_link = $7
    WHERE id = $1
    RETURNING *;
  `;

  const values = [
    id,
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

const updateJobStatus = async (
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

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  getJobOwner,
  updateJob,
  updateJobStatus,
};