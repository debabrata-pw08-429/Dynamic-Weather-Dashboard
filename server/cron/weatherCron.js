const axios = require("axios");
const cron = require("node-cron");
const weatherModel = require("../models/weatherModel");

const updateWeatherData = async () => {
  const cities = ["kolkata", "delhi"]; // Replace with your city list

  for (const city of cities) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
      );

      const weatherData = [response.data];
      await new Promise((resolve, reject) => {
        weatherModel.updateWeatherData(city, "current", weatherData, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
      );

      const hourlyData = forecastResponse.data.list;
      await new Promise((resolve, reject) => {
        weatherModel.updateWeatherData(city, "hourly", hourlyData, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error.message);
    }
  }
};

// Schedule the update every hour
cron.schedule("0 * * * *", updateWeatherData);
