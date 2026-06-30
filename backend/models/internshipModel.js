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

const getInternshipOwner = async (id) => {
  const result = await pool.query(
    `
    SELECT
      id,
      alumni_id
    FROM internships
    WHERE id = $1
    `,
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

const getAllInternshipsForAdmin = async () => {
  const result = await pool.query(`
    SELECT
      i.id,
      i.company_name,
      i.internship_title,
      i.duration,
      i.stipend,
      i.status,
      i.created_at,
      am.full_name AS posted_by,
      am.email AS alumni_email
    FROM internships i
    JOIN alumni_master am
      ON i.alumni_id = am.id
    ORDER BY i.created_at DESC;
  `);

  return result.rows;
};

const getInternshipDetailsForAdmin = async (id) => {
  const result = await pool.query(
    `
    SELECT
      i.*,

      am.id AS alumni_id,
      am.full_name,
      am.email,
      am.mobile,
      am.batch_year,
      am.department,

      ap.current_company,
      ap.designation,
      ap.linkedin_url

    FROM internships i

    JOIN alumni_master am
      ON i.alumni_id = am.id

    LEFT JOIN alumni_profiles ap
      ON am.id = ap.alumni_id

    WHERE i.id = $1;
    `,
    [id]
  );

  return result.rows[0];
};

const updateInternshipStatus = async (
  id,
  status
) => {
  const result = await pool.query(
    `
    UPDATE internships
    SET status = $2
    WHERE id = $1
    RETURNING *;
    `,
    [id, status]
  );

  return result.rows[0];
};

module.exports = {
  createInternship,
  getAllInternships,
  getInternshipById,
  getInternshipOwner,
  updateInternship,

  getAllInternshipsForAdmin,
  getInternshipDetailsForAdmin,
  updateInternshipStatus,
};