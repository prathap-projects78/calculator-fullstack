const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MySQL connection
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "calculator_db"
});

// 🔹 Connect DB
db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected");
});

app.post("/save", (req, res) => {
  const { expression, result } = req.body;

  const sql = "INSERT INTO history (expression, result) VALUES (?, ?)";
  db.query(sql, [expression, result], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Saved to database" });
  });
});

app.get("/history", (req, res) => {
  db.query(
    "SELECT * FROM history ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
