import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import style from "./Sidebar/Sidebar.module.css";
import { useAdmin } from "../../hooks/useStore";

export default function AdminDashboard() {

  const [getAdminProducts, getAdminCategories, getAdminSpecies] = useAdmin((state) => [
    state.getAdminProducts,
    state.getAdminCategories,
    state.getAdminSpecies,
  ]);

  useEffect(() => {
    // getAdminProducts();
    getAdminCategories();
    getAdminSpecies();
  }, []);

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
