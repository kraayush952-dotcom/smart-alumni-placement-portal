const pool = require("../config/db");

const createAlumni = async (
  registration_number,
  full_name,
  email,
  mobile,
  batch_year,
  department
) => {
  const query = `
    INSERT INTO alumni_master
    (
      registration_number,
      full_name,
      email,
      mobile,
      batch_year,
      department
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    registration_number,
    full_name,
    email,
    mobile,
    batch_year,
    department,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = {
  createAlumni,
};