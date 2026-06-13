const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Alumni Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

pool.connect()
  .then(() => {
    console.log("PostgreSQL Connected Successfully ✅");
  })
  .catch((err) => {
    console.error("Database Connection Error ❌", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});