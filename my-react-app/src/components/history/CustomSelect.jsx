import React from "react";

export default function CustomSelect({ setSelect, values, defaultValue }) {
  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => setSelect(e.target.value)}
    >
      {values?.map((value, id) => (
        <option key={id} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
