import React from "react";
import SettingIcon from "../../../assets/settings.svg";
import "./Profile.css";
export default function Profile({ first_name, last_name }) {
  const splitName = first_name?.charAt(0);
  return (
    <div className="profile-setting-wrapper">
      <div className="profile-setting-container">
        {/* <img src={SettingIcon} alt="Settings" className="settings-icon" /> */}
        <h5>{first_name + " " + last_name}</h5>
        <p>{splitName}</p>
      </div>
    </div>
  );
}
