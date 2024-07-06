import React, { useState, useEffect } from "react";
import "./Menu.css";
import { useLocation } from "react-router-dom";
export default function Menu({ icon, content, redirect, handleClick }) {
  const [iconUrl, setIconUrl] = useState();
  const location = useLocation();
  const checkIsActive = (path) => {
    return location.pathname.includes(path);
  };
  const getIconImage = async () => {
    try {
      if (checkIsActive(redirect)) {
        const ic = await import(`../../../assets/active/${icon}.svg`);
        setIconUrl(ic.default);
        return ic.default;
      }
      const ic = await import(`../../../assets/${icon}.svg`);
      setIconUrl(ic.default);
      return ic.default;
    } catch (error) {
      console.log(error);
    }
  };
  const changePath = () => {
    handleClick(redirect);
  };
  useEffect(() => {
    getIconImage();
  }, [location.pathname]);
  return (
    <div
      className={
        checkIsActive(redirect)
          ? "active-container menu-container"
          : "menu-container"
      }
      onClick={changePath}>
      <img src={iconUrl} alt={content} />
      <p>{content}</p>
    </div>
  );
}
