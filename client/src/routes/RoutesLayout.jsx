import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../components/common/HomePage/HomePage";
import Login from "../pages/Login/login";
import Signup from "../pages/SignUp/Signup";
import SideNavBar from "../Layout/SideNavBar/SideNavBar";
import { ViewJournal } from "../pages/ViewJournal/ViewJournal";
import { CreateJournal } from "../pages/CreateJournal/CreateJournal";

export const RoutesLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />}>
          <Route path="view-journal" element={<ViewJournal />} />
          <Route path="create-journal" element={<CreateJournal />} />
        </Route>
      </Routes>
    </div>
  );
};
