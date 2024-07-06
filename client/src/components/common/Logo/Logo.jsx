import React from "react";

import logoJour from "../../../assets/logo1.svg";
import "./Logo.css";
export default function Jourlogo() {
  return (
    <div className="logo-container">
      <img src={logoJour} alt="Du Jour Logo" />
    </div>
  );
}
