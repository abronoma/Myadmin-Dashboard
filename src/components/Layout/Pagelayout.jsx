import React from "react";
import Header from "../Header/index";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";


const PrimaryPageLayout = () => {
  return (
    <>
      <Header />
      <div className="grid-container">
        <Sidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PrimaryPageLayout;
