import React from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export default function WeatherMainData({ weatherData, formattedDate }) {
  return (
    <div className="current-card-main-data">
      {weatherData?.current?.is_day ? (
        <div className="current-card-day">
          <BsSunFill className="day-icon" />
          <span>Day, {weatherData?.current?.condition?.text}</span>
        </div>
      ) : (
        <div className="current-card-day">
          <BsMoonFill className="day-icon" />
          <span>Night, {weatherData?.current?.condition?.text}</span>
        </div>
      )}
      <h1>{weatherData?.current?.temp_c}&deg; C</h1>
      <p>{formattedDate}</p>
    </div>
  );
}
