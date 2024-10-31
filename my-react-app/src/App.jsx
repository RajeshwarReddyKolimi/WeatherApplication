import { useState } from "react";
import "./App.css";
import Loader from "./components/utils/Loader";
import WeatherData from "./components/weather/WeatherData";
import HistoryData from "./components/history/HistoryData";
import CurrentLocation from "./components/location/CurrentLocation";

function App() {
  const [currentLocation, setCurrentLocation] = useState({
    name: "Hyderabad",
    region: "Andhra Pradesh",
    country: "India",
  });
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div
        className="dashboard"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {loading && <Loader />}
        <CurrentLocation
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          setLoading={setLoading}
        />
        <WeatherData
          currentLocation={currentLocation}
          setLoading={setLoading}
        />
        <HistoryData
          currentLocation={currentLocation}
          setLoading={setLoading}
        />
      </div>
    </>
  );
}

export default App;
