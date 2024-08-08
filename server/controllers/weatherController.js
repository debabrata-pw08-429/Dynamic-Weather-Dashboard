const axios = require("axios");
const weatherModel = require("../models/weatherModel");

const getWeather = (req, res) => {
  const city = req.query.city;

  weatherModel.getWeatherByCity(city, "current", (err, weatherData) => {
    if (err) return res.status(500).json({ error: err.message });

    if (weatherData.length) {
      res.json(weatherData[0].data);
    } else {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
        )
        .then((response) => {
          const newWeatherData = [response.data];
          weatherModel.insertWeatherData(
            city,
            "current",
            newWeatherData,
            (err) => {
              if (err) return res.status(500).json({ error: err.message });
              res.json(newWeatherData[0]);
            }
          );
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    }
  });
};

const getHourlyForecast = (req, res) => {
  const city = req.query.city;

  weatherModel.getWeatherByCity(city, "hourly", (err, hourlyData) => {
    if (err) return res.status(500).json({ error: err.message });

    if (hourlyData.length) {
      res.json(hourlyData.map((entry) => entry.data));
    } else {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=50&appid=${process.env.OPENWEATHER_API_KEY}`
        )
        .then((response) => {
          const newHourlyData = response.data.list;
          weatherModel.insertWeatherData(
            city,
            "hourly",
            newHourlyData,
            (err) => {
              if (err) return res.status(500).json({ error: err.message });
              res.json(newHourlyData);
            }
          );
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    }
  });
};

module.exports = {
  getWeather,
  getHourlyForecast,
};
