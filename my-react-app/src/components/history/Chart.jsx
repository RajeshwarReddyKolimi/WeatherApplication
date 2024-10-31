import { LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import "./chart.css";
import getAxis from "../utils/getAxis";
import getvalues from "../utils/getValues";
import getYLabel from "../utils/getYLabel";
import sx from "../utils/sx";
export default function Chart({
  selectedChartPeriod,
  selectedCategory,
  currentLocation,
  availableDates,
  selectedDate,
  setLoading,
}) {
  const [axis, setAxis] = useState([]);
  const [values, setValues] = useState([]);
  const [yLabel, setYLabel] = useState("");
  async function getHistory() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://weatherapplication-rm3t.onrender.com/api/history?location=${currentLocation?.name}&startDate=${availableDates?.[6]}&endDate=${availableDates?.[0]}`
      );
      const data = await response.json();
      if (!response?.ok) return;
      setAxis(getAxis(data, selectedChartPeriod, selectedDate));
      setValues(
        getvalues(data, selectedChartPeriod, selectedCategory, selectedDate)
      );
      setYLabel(getYLabel(selectedCategory));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(getHistory, 1000 * 60 * 1);
    getHistory();
    return () => clearInterval(intervalId);
  }, [availableDates, selectedDate, selectedCategory, selectedChartPeriod]);

  return (
    <div className="chart-container">
      <LineChart
        className="chart"
        sx={sx}
        xAxis={[
          {
            scaleType: "band",
            label: selectedChartPeriod == "Weekly" ? "Date" : "Hour",
            data: axis,
          },
        ]}
        yAxis={[
          {
            label: yLabel,
          },
        ]}
        series={[{ data: values }]}
        width={600}
        height={300}
        colors={["#3b82f6"]}
      />
    </div>
  );
}
