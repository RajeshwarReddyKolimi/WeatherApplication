import React, { useEffect, useState } from "react";
import "./weather.css";
import WeatherAdditionalData from "./WeatherAdditionalData";
import WeatherMainData from "./WeatherMainData";
import formatDateStringFormat from "../utils/formatDateStringFormat";
export default function WeatherData({ currentLocation, setLoading }) {
  const [weatherData, setWeatherData] = useState();
  const [formattedDate, setFormattedDate] = useState();
  async function getCurrentData() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://weatherapplication-rm3t.onrender.com/api/current?location=${currentLocation?.name}`
      );
      const data = await response.json();
      if (!response?.ok) return;
      setWeatherData(data);
      setFormattedDate(formatDateStringFormat(data?.location?.localtime));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const intervalId = setInterval(getCurrentData, 1000 * 60 * 1);
    getCurrentData();
    return () => clearInterval(intervalId);
  }, [currentLocation]);

  return (
    <section className="current-card">
      <WeatherMainData
        weatherData={weatherData}
        formattedDate={formattedDate}
      />
      <WeatherAdditionalData weatherData={weatherData} />
    </section>
  );
}
