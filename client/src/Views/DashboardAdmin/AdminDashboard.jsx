import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import style from "./Sidebar/Sidebar.module.css";
import { useAdmin } from "../../hooks/useStore";
import { MdClose, MdMenu } from "react-icons/md";

export default function AdminDashboard() {
  const [
    getAdminProducts,
    getAdminCategories,
    getAdminSpecies,
    getAdminProviders,
    getAdminUsers,
  ] = useAdmin((state) => [
    state.getAdminProducts,
    state.getAdminCategories,
    state.getAdminSpecies,
    state.getAdminProviders,
    state.getAdminUsers,
  ]);

  useEffect(() => {
    getAdminProducts();
    getAdminUsers();
    getAdminCategories();
    getAdminSpecies();
    getAdminProviders();
  }, []);

  const [show, setShow] = useState(false)

  return (
    <div className="container-xxl">
      {show ?
        <MdClose className={style.menuButton} onClick={()=> setShow(!show)}/> :
        <MdMenu className={style.menuButton} onClick={()=> setShow(!show)}/>}
      <div className="row">
        <div className={`${show ? style.showSidebar : style.sidebarContainer} sidebar col-3`}>
          <Sidebar setShow={setShow} show={show}/>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
