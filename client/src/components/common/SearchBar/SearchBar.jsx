import React from "react";
import "./SearchBar.css";
import Magnifier from "../../../assets/search.svg";
export default function SearchBar() {
  return (
    <div className="searchBar-wrapper">
      <input type="text" placeholder="Search journal" />
      <img src={Magnifier} alt="Search" />
    </div>
  );
}
