/**
 * db.js
 * Configures the database connection.
 */

const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000, // Optional: increase connection timeout to 10 seconds
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to the database");
});

module.exports = db;
