import React from "react";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { BiLogOut, BiNotification } from "react-icons/bi";
import { useLogin } from "../../../hooks/useAuth";
import logo from "../../../assets/logo.png";

const Sidebar = () => {

    const [logoutUser] = useLogin((state) => [state.logoutUser]);

  return (
    <>
      <div className="logo-container d-flex align-items-center mt-5 ms-5 gap-15">
        <h1 className={`${style.h1} fw-bold mb-0`}>PetsAmerica</h1>
        <img className={style.imgLogo} src={logo} alt="logo" />
      </div>
      <div className="menu ms-5 mt-5 d-flex flex-column gap-30">
        <div className={`${style.item} d-flex gap-15 align-items-center mt-5`}>
          <AiOutlineUser className={style.icons} />
          <NavLink
            to="/providerDashboard/profile"
            className={({ isActive }) => (isActive ? style.active : style.link)}
          >
            Mi Perfil
          </NavLink>
        </div>
        <div className={`${style.item} d-flex gap-15 align-items-center`}>
          <BsBoxSeam className={style.icons} />
          <NavLink
            to="/providerDashboard/products"
            className={({ isActive }) => (isActive ? style.active : style.link)}
          >
            Productos
          </NavLink>
        </div>
        <div className={`${style.item} d-flex gap-15 align-items-center`}>
          <BiNotification className={style.icons} />
          <NavLink
            to="/providerDashboard/activities"
            className={({ isActive }) => (isActive ? style.active : style.link)}
          >
            Actividades
          </NavLink>
        </div>
      </div>
      <div className="signout ms-5 mt-5 d-flex align-items-center gap-15">
        <BiLogOut className={`${style.icons} mt-5`} />
        <button className={`${style.button} mt-5`} onClick={() => logoutUser()}>
          Cerrar sesión
        </button>
      </div>
    </>
  );
};

export default Sidebar;
