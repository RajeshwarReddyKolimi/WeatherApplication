import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import "./history.css";

export default function HistoryData({ currentLocation, setLoading }) {
  const [historyData, setHistoryData] = useState();
  const [setting, setSetting] = useState();
  const [loaded, setLoaded] = useState(false);
  const [selectedChartPeriod, setSelectedChartPeriod] = useState("Weekly");
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(formattedDate(0));

  function formattedDate(i) {
    const curDate = new Date(Date.now() - i * 86400000);
    const day = String(curDate.getDate()).padStart(2, "0");
    const month = String(curDate.getMonth() + 1).padStart(2, "0");
    const year = curDate.getFullYear();
    return `${year}-${month}-${day}`;
  }
  function getAvailableDates() {
    const date = Date.now();
    const dates = [];
    for (let i = 0; i < 7; i++) dates.push(formattedDate(i));
    setAvailableDates(dates);
  }
  useEffect(() => {
    getAvailableDates();
  }, []);
  return (
    <section className="history-card">
      <div className="history-card-settings">
        <select
          defaultValue="Weekly"
          onChange={(e) => setSelectedChartPeriod(e.target.value)}
        >
          <option value="Weekly">Weekly</option>
          <option value="Daily">Daily</option>
        </select>
        <div className="flex-buffer"></div>
        {selectedChartPeriod == "Daily" && (
          <select
            defaultValue={availableDates?.[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {availableDates?.map((date, id) => (
              <option key={id} value={date}>
                {date}
              </option>
            ))}
          </select>
        )}
      </div>

      <Chart
        type={selectedChartPeriod}
        currentLocation={currentLocation}
        availableDates={availableDates}
        selectedDate={selectedDate}
        setLoading={setLoading}
      />
      <h2>
        {selectedChartPeriod} temperature data of {currentLocation?.name} in
        &deg;C
      </h2>
    </section>
  );
}
