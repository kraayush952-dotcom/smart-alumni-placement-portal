const pool = require("../config/db");

const createMentorshipRequest = async (
  studentId,
  alumniId,
  message
) => {
  const result = await pool.query(
    `
    INSERT INTO mentorship_requests
    (
      student_id,
      alumni_id,
      message,
      status
    )
    VALUES ($1, $2, $3, 'pending')
    RETURNING *;
    `,
    [studentId, alumniId, message]
  );

  return result.rows[0];
};

const getMentorshipRequestsByAlumni = async (
  alumniId
) => {
  const result = await pool.query(
    `
    SELECT
      mr.*,
      s.full_name AS student_name,
      s.email AS student_email,
      s.department
    FROM mentorship_requests mr
    JOIN students s
      ON mr.student_id = s.id
    WHERE mr.alumni_id = $1
    ORDER BY mr.created_at DESC
    `,
    [alumniId]
  );

  return result.rows;
};

const updateMentorshipStatus = async (
  requestId,
  status
) => {
  const result = await pool.query(
    `
    UPDATE mentorship_requests
    SET status = $2
    WHERE id = $1
    RETURNING *;
    `,
    [requestId, status]
  );

  return result.rows[0];
};

module.exports = {
  createMentorshipRequest,
  getMentorshipRequestsByAlumni,
  updateMentorshipStatus,
};