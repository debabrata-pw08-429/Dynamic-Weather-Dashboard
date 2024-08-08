const db = require("../config/db");

const getWeatherByCity = (city, type, callback) => {
  db.query(
    "SELECT * FROM weather WHERE city = ? AND type = ? ORDER BY timestamp ASC",
    [city, type],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

const insertWeatherData = (city, type, weatherData, callback) => {
  const insertValues = weatherData.map((data) => [
    city,
    type,
    JSON.stringify(data),
    new Date(data.dt * 1000),
  ]);

  db.query(
    "INSERT INTO weather (city, type, data, timestamp) VALUES ?",
    [insertValues],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

const updateWeatherData = (city, type, weatherData, callback) => {
  db.query(
    "DELETE FROM weather WHERE city = ? AND type = ?",
    [city, type],
    (err) => {
      if (err) return callback(err);

      insertWeatherData(city, type, weatherData, callback);
    }
  );
};

module.exports = {
  getWeatherByCity,
  insertWeatherData,
  updateWeatherData,
};
