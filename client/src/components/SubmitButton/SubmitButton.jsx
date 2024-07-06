import React from "react";
import "./SubmitButton.css";
export default function SubmitButton({
  type,
  value,
  color,
  width,
  height,
  onClick,
}) {
  return (
    <div className="submitButton-container">
      <input
        type={type}
        value={value}
        style={{
          backgroundColor: `${color}`,
          width: `${width}`,
          height: `${height}`,
        }}
        onClick={onClick}
        readOnly={true}
      />
    </div>
  );
}
