import React from "react";
import "./InputField.css";

export default function InputField({
  type,
  value,
  placeholder,
  change,
  error,
  name,
}) {
  return (
    <div className="input-container">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={change}
      />
      <p className="error">{error}</p>
    </div>
  );
}
