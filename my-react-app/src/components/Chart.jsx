import { LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import "./chart.css";
export default function Chart({
  type,
  currentLocation,
  availableDates,
  selectedDate,
  setLoading,
}) {
  const [axis, setAxis] = useState([]);
  const [values, setValues] = useState([]);
  async function getHistory() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://weatherapplication-rm3t.onrender.com/api/history?location=${currentLocation?.name}&startDate=${availableDates?.[6]}&endDate=${availableDates?.[0]}`
      );
      const data = await response.json();
      if (!response?.ok) return;
      if (type == "Weekly") {
        setAxis(
          data?.forecast?.forecastday?.map((forecastday) => forecastday?.date)
        );
        setValues(
          data?.forecast?.forecastday?.map(
            (forecastday) => forecastday?.day?.avgtemp_c
          )
        );
      } else {
        setAxis(
          data?.forecast?.forecastday
            ?.filter((day) => `${day?.date}` === `${selectedDate}`)
            ?.map((day) =>
              day?.hour?.map((hour) => hour?.time?.substring(11, 13))
            )
            .flat(2)
        );
        setValues(
          data?.forecast?.forecastday
            ?.filter((day) => `${day?.date}` === `${selectedDate}`)
            ?.map((day) => day?.hour?.map((hour) => hour?.temp_c))
            .flat(2)
        );
      }
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
  }, [availableDates, selectedDate, type]);
  return (
    <div className="chart-container">
      <LineChart
        className="chart"
        sx={{
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.1",
            fill: "white",
          },
          "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
            fontFamily: "Roboto",
          },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.1",
            fill: "white",
          },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
            stroke: "white",
            strokeWidth: 1,
          },
          "& .MuiChartsAxis-left .MuiChartsAxis-line": {
            stroke: "white",
            strokeWidth: 1,
          },
          "& .MuiChartsAxis-left .MuiChartsAxis-label": {
            stroke: "white",
          },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-label": {
            stroke: "white",
          },
        }}
        xAxis={[
          {
            scaleType: "band",
            label: type == "Weekly" ? "Date" : "Hour",
            data: axis,
          },
        ]}
        yAxis={[
          {
            label: "Temperature in C",
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
