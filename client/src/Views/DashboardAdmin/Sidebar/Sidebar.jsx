import React from 'react';
import style from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { RiUserStarFill } from 'react-icons/ri';
import { BsFillBoxSeamFill } from 'react-icons/bs';
import { MdCategory, MdPets } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import logo from "../../../assets/logo.png";

const Sidebar = () => {
   return (
      <>
         <div className="logo-container d-flex align-items-center mt-5 ms-5 gap-15">
            <h1 className={`${style.h1} fw-bold mb-0`}>PetsAmerica</h1>
            <img className={style.imgLogo} src={logo} alt="logo" />
         </div>
         <div className="menu ms-5 mt-5 d-flex flex-column gap-30">
            <div className={`${style.item} d-flex gap-15 align-items-center mt-5`}>
               <FaUsers className={style.icons} />
               <NavLink to="/dashboard-admin/users" className={style.link}>Usuarios</NavLink>
            </div>
            <div className={`${style.item} d-flex gap-15 align-items-center`}>
               <RiUserStarFill className={style.icons} />
               <NavLink to="/dashboard-admin/providers" className={style.link}>Proveedores</NavLink>
            </div>
            <div className={`${style.item} d-flex gap-15 align-items-center`}>
               <BsFillBoxSeamFill className={style.icons} />   
               <NavLink to="/dashboard-admin/products" className={style.link}>Productos</NavLink>
            </div>
            <div className={`${style.item} d-flex gap-15 align-items-center`}>
               <MdCategory className={style.icons} />
               <NavLink to="/dashboard-admin/categories" className={style.link}>Categorías</NavLink>
            </div>
            <div className={`${style.item} d-flex gap-15 align-items-center`}>
               <MdPets className={style.icons} />
               <NavLink to="/dashboard-admin/animals" className={style.link}>Animales</NavLink>
            </div>
         </div>
         <div className="signout ms-5 mt-5 d-flex align-items-center gap-15">
            <BiLogOut className={`${style.icons} mt-5`} />
            <button className={`${style.button} mt-5`}>
               Cerrar sesión
            </button>
         </div>
      </>
   )
}

export default Sidebar