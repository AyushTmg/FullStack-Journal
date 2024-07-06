import React from "react";
import LeftSideBook from "../LeftSideBook/LeftSideBook.jsx";
import RightSideBook from "../RightSideBook/RightSideBook.jsx";
import "./Journal.css";
export default function Journal() {
  return (
    <div className="journal-wrapper">
      <div className="journal-container">
        <LeftSideBook />
        <RightSideBook />
      </div>
    </div>
  );
}
