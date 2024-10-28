import React from "react";
import CurrentData from "./CurrentData";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <CurrentData />
      <History />
    </div>
  );
}
