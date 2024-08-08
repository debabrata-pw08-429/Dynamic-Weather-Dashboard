import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import WeatherDisplay from "./components/WeatherDisplay";
import HourlyForecast from "./components/HourlyForecast";
import CitySearch from "./components/CitySearch";

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("new york");

  console.log("weatherData", weatherData);

  useEffect(() => {
    fetchWeatherData(city);
    const interval = setInterval(() => fetchWeatherData(city), 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, [city]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/weather?city=${city}`
      );

      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <AppContainer>
      <CitySearch setCity={setCity} />
      {weatherData && (
        <>
          <WeatherDisplay weatherData={weatherData} />
          <HourlyForecast city={city} />
        </>
      )}
    </AppContainer>
  );
}

export default App;
