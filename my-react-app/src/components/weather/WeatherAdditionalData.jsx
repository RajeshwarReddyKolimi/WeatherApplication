import React from "react";
import { BsCloudRain } from "react-icons/bs";
import { FiWind } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineCloud } from "react-icons/md";
import { PiWaves } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";

export default function WeatherAdditionalData({ weatherData }) {
  return (
    <div className="current-card-additional-container">
      <div className="current-card-additional-item">
        <MdOutlineCloud className="icon" />
        <div>
          <div>Cloud cover</div>
          <div>
            <b>{weatherData?.current?.cloud}%</b>
          </div>
        </div>
      </div>
      <div className="current-card-additional-item">
        <FiWind className="icon" />
        <div>
          <div>Wind</div>
          <div>
            <b>{weatherData?.current?.wind_kph} kph </b>
            <b>{weatherData?.current?.wind_dir}</b>
          </div>
        </div>
      </div>
      <div className="current-card-additional-item">
        <WiHumidity className="icon" />
        <div>
          <div>Humidity</div>
          <div>
            <b>{weatherData?.current?.humidity}</b>
            <b>%</b>
          </div>
        </div>
      </div>
      <div className="current-card-additional-item">
        <IoSunnyOutline className="icon" />
        <div>
          <div>UV Index</div>
          <div>
            <b>{weatherData?.current?.uv}</b>
          </div>
        </div>
      </div>
      <div className="current-card-additional-item">
        <BsCloudRain className="icon" />
        <div>
          <div>Precipitation</div>
          <div>
            <b>{weatherData?.current?.precip_mm}mm</b>
          </div>
        </div>
      </div>
      <div className="current-card-additional-item">
        <PiWaves className="icon" />
        <div>
          <div>Pressure</div>
          <div>
            <b>{weatherData?.current?.pressure_mb}mm</b>
          </div>
        </div>
      </div>
    </div>
  );
}
