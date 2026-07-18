const pool = require("../config/db");

const createAlumni = async (
  registration_number,
  full_name,
  email,
  mobile,
  batch_year,
  department,
  password
) => {
  const query = `
    INSERT INTO alumni_master
    (
      registration_number,
      full_name,
      email,
      mobile,
      batch_year,
      department,
      password
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
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

const getAlumniByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM alumni_master WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

const getAlumniByMobile = async (mobile) => {
  const result = await pool.query(
    "SELECT * FROM alumni_master WHERE mobile = $1",
    [mobile]
  );

  return result.rows[0];
};

const getProfileByAlumniId = async (alumniId) => {
  const result = await pool.query(
    "SELECT * FROM alumni_profiles WHERE alumni_id = $1",
    [alumniId]
  );

  return result.rows[0];
};

const updateProfile = async (
  alumniId,
  current_company,
  designation,
  location,
  linkedin_url,
  skills,
  bio,
  mentorship_available,
  profile_photo
) => {
  const query = `
    UPDATE alumni_profiles
    SET
      current_company = $2,
      designation = $3,
      location = $4,
      linkedin_url = $5,
      skills = $6,
      bio = $7,
      mentorship_available = $8,
      profile_photo = $9
    WHERE alumni_id = $1
    RETURNING *;
  `;

  const values = [
    alumniId,
    current_company,
    designation,
    location,
    linkedin_url,
    skills,
    bio,
    mentorship_available,
    profile_photo,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getAllAlumni = async () => {
  const result = await pool.query(`
    SELECT
      am.id,
      am.full_name,
      am.batch_year,
      am.department,
      ap.current_company,
      ap.designation,
      ap.mentorship_available
    FROM alumni_master am
    LEFT JOIN alumni_profiles ap
      ON am.id = ap.alumni_id
    ORDER BY am.id DESC
  `);

  return result.rows;
};

const getAlumniById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      am.id,
      am.full_name,
      am.email,
      am.mobile,
      am.batch_year,
      am.department,
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

module.exports = {
  createAlumni,
  getAlumniByEmail,
  getAlumniByMobile,
  getProfileByAlumniId,
  updateProfile,
  getAllAlumni,
  getAlumniById,
};