import React from "react";
import { FaTemperatureHigh } from "react-icons/fa";
import Clock from "./Clock";
import CityMap from "./CityMap"; // Import the CityMap component
import style from "./weatherDisplay.module.css";

const WeatherDisplay = ({ weatherData }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div className={style.currentWeatherContainer}>
      <div className={style.currentWeatherHead}>
        <h2>
          {weatherData.name}, {weatherData.sys.country}
        </h2>

        <div>
          <p>{weatherData.weather[0].description.toUpperCase()} , </p>
          <p>
            <Clock />
          </p>
        </div>

        <div className={style.currentTemp}>
          <div>
            <img
              src={iconUrl}
              alt="weather icon"
              width="100px"
              height="100px"
            />
          </div>

          <h1>
            <FaTemperatureHigh /> {Math.round(weatherData.main.temp - 273.15)}°C
          </h1>
        </div>

        <div className={style.currentExtraDetails}>
          <div>Humidity : {weatherData.main.humidity}% | </div>
          <div>Speed : {weatherData.wind.speed} m/s | </div>
          <div>Pressure : {weatherData.main.pressure} Pa </div>
        </div>
      </div>

      <div className={style.currentCityMap}>
        <CityMap lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
      </div>
    </div>
  );
};

export default WeatherDisplay;
