import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import "./history.css";
import getWeekDates from "../utils/getWeekDates";
import formatDateDashFormat from "../utils/formatDateDashFormat";
import CustomSelect from "./CustomSelect";

export default function HistoryData({ currentLocation, setLoading }) {
  const [selectedChartPeriod, setSelectedChartPeriod] = useState("Weekly");
  const [selectedCategory, setSelectedCategory] = useState("Temperature");
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(formatDateDashFormat(0));
  useEffect(() => {
    setAvailableDates(getWeekDates());
  }, []);
  return (
    <section className="history-card">
      <div className="history-card-settings">
        <CustomSelect
          setSelect={setSelectedChartPeriod}
          values={["Weekly", "Daily"]}
          defaultValue="Weekly"
        />
        {selectedChartPeriod == "Daily" && (
          <CustomSelect
            setSelect={setSelectedDate}
            values={availableDates}
            defaultValue={availableDates?.[0]}
          />
        )}
        <CustomSelect
          setSelect={setSelectedCategory}
          values={["Temperature", "Wind", "Humidity", "Precipitation", "UV"]}
          defaultValue="Temperature"
        />
      </div>
      <h2>
        {selectedChartPeriod} {selectedCategory} data of {currentLocation?.name}{" "}
        in &deg;C
      </h2>

      <Chart
        selectedChartPeriod={selectedChartPeriod}
        selectedCategory={selectedCategory}
        currentLocation={currentLocation}
        availableDates={availableDates}
        selectedDate={selectedDate}
        setLoading={setLoading}
      />
    </section>
  );
}
