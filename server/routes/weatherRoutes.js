/**
 * weatherRoutes.js
 * Defines the API routes for weather data.
 */

const express = require("express");
const weatherController = require("../controllers/weatherController");

const router = express.Router();

// Route to get weather data
router.get("/weather", weatherController.getWeather);
router.get("/hourly-forecast", weatherController.getHourlyForecast);

module.exports = router;
