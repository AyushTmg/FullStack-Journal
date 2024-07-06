import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RoutesLayout } from "./routes/RoutesLayout.jsx";
export default function App() {
  return (
    <div className="app-wrapper">
      <RoutesLayout />
      <ToastContainer />
    </div>
  );
}
