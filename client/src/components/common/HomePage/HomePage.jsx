import React, { useEffect, useLayoutEffect } from "react";
import "./HomePage.css";
import SearchBar from "../SearchBar/SearchBar";
import Profile from "../ProfileSec/Profile";
import Logo from "../Logo/Logo";
import { Outlet, useLocation } from "react-router-dom";
import SideNavBar from "../../../Layout/SideNavBar/SideNavBar";
import { getUserDetails } from "../../../utils/getUserDetails";

export default function HomePage() {
  const location = useLocation();
  const userDetails = getUserDetails();
  useEffect(() => {
    console.log(location.pathname);
  }, []);
  return (
    <div className="homePage-wrapper">
      {userDetails && (
        <div className="homePage-container">
          <header>
            <Logo />
            <Profile
              first_name={userDetails.first_name}
              last_name={userDetails.last_name}
            />
          </header>
          <main className="homePage-main">
            <SideNavBar />
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
}
