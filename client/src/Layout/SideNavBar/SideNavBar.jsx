import React from "react";
import Menu from "../../components/common/Menu/Menu";
import "./SideNavBar.css";
import Features from "../../data/Features.json";
import { useNavigate } from "react-router-dom";
export default function SideNavBar() {
  const redirect = useNavigate();
  const changePath = (path) => {
    redirect(`/${path}`);
  };
  return (
    <div className="side-nav-container">
      {Features.features.map((feat, index) => {
        return (
          <Menu
            key={index}
            icon={feat.icon}
            content={feat.name}
            redirect={feat.redirect}
            handleClick={changePath}
          />
        );
      })}
    </div>
  );
}
