import React from "react";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { RiUserStarFill } from "react-icons/ri";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { MdCategory, MdPets } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useLogin } from "../../../hooks/useAuth";
import logo from "../../../assets/logo.png";

const Sidebar = () => {

  const [logoutUser] = useLogin((state) => [state.logoutUser]);


  return (
    <div className="container">
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="navbar-brand">
          <NavLink to="/">
            <div className="logo-container d-flex align-items-center gap-15">
              <h1 className={`${style.h1} fw-bold mb-0`}>PetsAmerica</h1>
              <img className={style.imgLogo} src={logo} alt="logo" />
            </div>
          </NavLink>
        </div>
        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/adminDashboard/users" className="nav-link">
                <div className={`${style.item} d-flex gap-15 align-items-center mt-5`}>
                  <FaUsers className={style.icons} />
                  Usuarios
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/adminDashboard/products" className="nav-link">
                <div className={`${style.item} d-flex gap-15 align-items-center`}>
                  <BsFillBoxSeamFill className={style.icons} />
                  Productos
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/adminDashboard/categories" className="nav-link">
                <div className={`${style.item} d-flex gap-15 align-items-center`}>
                  <MdCategory className={style.icons} />
                  Categorías
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/adminDashboard/animals" className="nav-link">
                <div className={`${style.item} d-flex gap-15 align-items-center`}>
                  <MdPets className={style.icons} />
                  Animales
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={() => logoutUser()}>
                <div className="signout d-flex align-items-center gap-15">
                  <BiLogOut className={`${style.icons} mt-5`} />
                  Cerrar sesión
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}


export default Sidebar;
