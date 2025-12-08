require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "203.91.116.122",
  port: process.env.DB_PORT || 22136,
  user: process.env.DB_USER || "teams",
  password: process.env.DB_PASSWORD || "YOUR_PASSWORD_HERE",
  database: process.env.DB_NAME || "team6_event_portal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
