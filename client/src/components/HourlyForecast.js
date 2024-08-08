import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { isCurrentDate } from "../utils/isCurrentDate";
import style from "./hourlyForecast.module.css";

const ForecastContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  gap: 15px;
  margin: auto;

  /* Tablet view */
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }

  /* Mobile view */
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

const HourlyForecastContainer = styled.div`
  border: 1px solid grey;
  width: 50%;
  overflow-x: scroll;

  /* Tablet view */
  @media (max-width: 768px) {
    width: 100%;
  }

  /* Mobile view */
  @media (max-width: 480px) {
    width: 100%;
    padding: 12px;
  }
`;

const DailyForecastContainer = styled.div`
  border: 1px solid grey;
  width: 50%;

  /* Tablet view */
  @media (max-width: 768px) {
    width: 100%;
  }

  /* Mobile view */
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const HourlyForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);

  console.log("forecast", forecast);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/hourly-forecast`,
          {
            params: {
              city: city,
            },
          }
        );

        setForecast(response.data);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecast();
  }, [city]);

  const hourlyForecast = forecast.filter((hour) => isCurrentDate(hour.dt_txt));

  const dailyForecast = forecast.filter((hour) => !isCurrentDate(hour.dt_txt));

  return (
    <ForecastContainer>
      <HourlyForecastContainer>
        <h2>Hourly Forecast</h2>
        <div className={style.currenthourlyForecast}>
          {hourlyForecast.map((hour, index) => (
            <div key={index}>
              <div>
                {new Date(hour.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  width="50px"
                  height="50px"
                />
              </div>
              <div>{Math.round(hour.main.temp - 273.15)}°C</div>
            </div>
          ))}
        </div>
      </HourlyForecastContainer>

      <DailyForecastContainer>
        <h2>Daily Forecast</h2>
        <div className={style.dailyForecastContainer}>
          <div className={style.dailyForecast}>
            {dailyForecast.map((day, index) => (
              <div key={index} className={style.dailyForecastItems}>
                <div>
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className={style.dailyForecastImg}>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt="weather icon"
                    width="50px"
                    height="50px"
                  />
                  {Math.round(day.main.temp_min - 273.15)}°C
                </div>
                <div> {day.weather[0].description}</div>
              </div>
            ))}
          </div>
        </div>
      </DailyForecastContainer>
    </ForecastContainer>
  );
};

export default HourlyForecast;
