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

module.exports = {
  getAdminByEmail,
  getDashboardStats,
};