const pool = require("../config/db");

const createOrUpdateResume = async (
  studentId,
  fileName,
  fileUrl,
  publicId
) => {
  const query = `
    INSERT INTO student_resumes
      (student_id, file_name, file_url, public_id)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (student_id)
    DO UPDATE SET
      file_name = EXCLUDED.file_name,
      file_url = EXCLUDED.file_url,
      public_id = EXCLUDED.public_id,
      uploaded_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;

  const values = [
    studentId,
    fileName,
    fileUrl,
    publicId,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getResumeByStudentId = async (studentId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM student_resumes
    WHERE student_id = $1
    `,
    [studentId]
  );

  return result.rows[0];
};

const deleteResumeByStudentId = async (studentId) => {
  const result = await pool.query(
    `
    DELETE FROM student_resumes
    WHERE student_id = $1
    RETURNING *;
    `,
    [studentId]
  );

  return result.rows[0];
};

module.exports = {
  createOrUpdateResume,
  getResumeByStudentId,
  deleteResumeByStudentId,
};