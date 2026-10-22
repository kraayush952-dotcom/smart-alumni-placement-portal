const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const studentRoutes = require("./routes/studentRoutes");
const alumniRoutes = require("./routes/alumniRoutes");
const mentorshipRoutes = require("./routes/mentorshipRoutes");
const adminRoutes = require("./routes/adminRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/mentorship", mentorshipRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/resumes", resumeRoutes);

app.get("/", (req, res) => {
  res.send("Smart Alumni Backend Running 🚀");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

pool.query("SELECT NOW()")
  .then(() => {
    console.log("PostgreSQL Connected Successfully ✅");
  })
  .catch((err) => {
    console.error("Database Connection Error ❌", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});