import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import style from "./Sidebar/Sidebar.module.css";

export default function AdminDashboard() {
  return (
    <div className="container-xxl">
      <div className="row">
        <div className={`${style.sidebarContainer} sidebar col-3`}>
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
