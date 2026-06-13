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

module.exports = {
  createAlumni,
  getAlumniByEmail,
};