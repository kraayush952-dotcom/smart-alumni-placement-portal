const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const internshipRoutes = require("./routes/internshipRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/internships", internshipRoutes);

app.get("/", (req, res) => {
  res.send("Smart Alumni Backend Running 🚀");
});

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