import React from "react";
import "./loaders.css";

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="loader-action"></div>
      </div>
    </div>
  );
}
