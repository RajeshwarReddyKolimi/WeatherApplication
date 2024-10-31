import React, { useEffect, useState } from "react";
import { BsCloudRain, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FiWind } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineCloud } from "react-icons/md";
import "./current.css";
export default function CurrentData({ currentLocation, setLoading }) {
  const [currentData, setCurrentData] = useState();
  const [formattedDate, setFormattedDate] = useState();
  function formatDate(dateString) {
    const date = new Date(dateString);
    let hours = String(date.getHours()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    return `${hours}:${minutes} ${period}, ${dayOfWeek}, ${day} ${month}, ${year}`;
  }
  async function getCurrentData() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://weatherapplication-rm3t.onrender.com/api/current?location=${currentLocation?.name}`
      );
      const data = await response.json();

      if (!response?.ok) return;
      setCurrentData(data);
      setFormattedDate(formatDate(data?.location?.localtime));
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
      <div className="current-card-main-data">
        {currentData?.current?.is_day ? (
          <div className="current-card-day">
            <BsSunFill className="day-icon" />
            <span>Day, {currentData?.current?.condition?.text}</span>
          </div>
        ) : (
          <div className="current-card-day">
            <BsMoonFill className="day-icon" />
            <span>Night, {currentData?.current?.condition?.text}</span>
          </div>
        )}
        <h1>{currentData?.current?.temp_c}&deg; C</h1>
        <p>{formattedDate}</p>
      </div>
      <div className="current-card-additional-container">
        <div className="current-card-additional-item">
          <MdOutlineCloud className="icon" />
          <div>
            <div>Cloud cover</div>
            <div>
              <b>{currentData?.current?.cloud}%</b>
            </div>
          </div>
        </div>
        <div className="current-card-additional-item">
          <FiWind className="icon" />
          <div>
            <div>Wind</div>
            <div>
              <b>{currentData?.current?.wind_kph}</b>
              <b>{currentData?.current?.wind_dir}</b>
            </div>
          </div>
        </div>
        <div className="current-card-additional-item">
          <WiHumidity className="icon" />
          <div>
            <div>Humidity</div>
            <div>
              <b>{currentData?.current?.humidity}</b>
              <b>%</b>
            </div>
          </div>
        </div>
        <div className="current-card-additional-item">
          <IoSunnyOutline className="icon" />
          <div>
            <div>UV Index</div>
            <div>
              <b>{currentData?.current?.uv}</b>
            </div>
          </div>
        </div>
        <div className="current-card-additional-item">
          <BsCloudRain className="icon" />
          <div>
            <div>Precipitation</div>
            <div>
              <b>{currentData?.current?.precip_mm}mm</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
