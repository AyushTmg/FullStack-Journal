import React, { useState, useRef, useReducer } from "react";
import BgImg from "../../assets/backgroundLayout.svg";
import "./LeftSideBook.css";
import ImgInput from "../ImgInput/ImgInput";
export default function LeftSideBook() {
  const currentDate = new Date();
  const [fileData, setfileData] = useState(null);

  const inputRef = useRef(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      setfileData(fileReader.result);
    };
    fileReader.onerror = function (error) {
      setfileData("Error", error);
    };
  };

  const renderPopup = () => {
    inputRef.current.click();
  };
  return (
    <div className="left-book-container">
      <main className="left-book-main">
        <img src={BgImg} alt="Background Image" />
        {/* <div className="image-display-section">
          {fileData && (
            <img src={fileData} alt="User Image" className="user-image" />
          )}
        </div>
        <div className="insert-button-section">
          <div className="insert-button">
            <button onClick={renderPopup}>Insert</button>

            <input type="file" hidden ref={inputRef} onChange={handleChange} />
          </div>
        </div> */}
      </main>
    </div>
  );
}
