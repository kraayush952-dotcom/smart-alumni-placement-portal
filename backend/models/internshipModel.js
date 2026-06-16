const pool = require("../config/db");

const createInternship = async (
  alumniId,
  company_name,
  internship_title,
  internship_description,
  duration,
  stipend,
  application_link
) => {
  const query = `
    INSERT INTO internships
    (
      alumni_id,
      company_name,
      internship_title,
      internship_description,
      duration,
      stipend,
      application_link
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    alumniId,
    company_name,
    internship_title,
    internship_description,
    duration,
    stipend,
    application_link,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getAllInternships = async () => {
  const result = await pool.query(
    "SELECT * FROM internships ORDER BY created_at DESC"
  );

  return result.rows;
};

const getInternshipById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM internships WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

const updateInternship = async (
  id,
  company_name,
  internship_title,
  internship_description,
  duration,
  stipend,
  application_link
) => {
  const query = `
    UPDATE internships
    SET
      company_name = $2,
      internship_title = $3,
      internship_description = $4,
      duration = $5,
      stipend = $6,
      application_link = $7
    WHERE id = $1
    RETURNING *;
  `;

  const values = [
    id,
    company_name,
    internship_title,
    internship_description,
    duration,
    stipend,
    application_link,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const deleteInternship = async (id) => {
  const result = await pool.query(
    "DELETE FROM internships WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
};