import React, { useEffect, useState } from "react";
import bgImg from "../../assets/backgroundLayout.svg";
import "./RightSideBook.css";

export default function RightSideBook() {
  const [inputValue, setinputValue] = useState(["hello", "hi"]);
  const [newInputValue, setnewInputValue] = useState("");

  const handleChange = (e) => {
    setnewInputValue(e.target.value);
  };
  const AddTask = () => {
    if (newInputValue.trim() !== "") {
      setinputValue([...inputValue, newInputValue]);
    }
  };
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();

  return (
    <div className="right-book-wrapper">
      <div className="right-book-container">
        {/* <header className="right-header"><p>Date:{date}</p></header> */}
        <main className="right-book-main">
          <img src={bgImg} alt="Background Image" />

          {/* <div className="textarea-button-sec">
          <textarea placeholder="Entry section" onChange={handleChange} />
          <button onClick={AddTask}>Save</button>
        </div> */}
        </main>
      </div>
    </div>
  );
}
