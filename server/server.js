/**
 * server.js
 * Entry point for the application.
 */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const weatherRoutes = require("./routes/weatherRoutes");

require("./config/db");
require("./cron/weatherCron");

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// Use weather routes
app.use("/api", weatherRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
