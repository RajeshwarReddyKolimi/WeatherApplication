import { useState } from "react";
import "./App.css";
import CurrentData from "./components/CurrentData";
import CurrentLocation from "./components/CurrentLocation";
import HistoryData from "./components/HistoryData";
import Loader from "./components/Loader";

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
        <CurrentData
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
