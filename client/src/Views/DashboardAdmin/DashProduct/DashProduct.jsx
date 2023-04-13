import React from 'react';
import style from './DashProduct.module.css';
import Sidebar from '../Sidebar/Sidebar';
import DarkMode from '../../../components/DarkMode/DarkMode';
import { FaUserCircle } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { ImUserMinus } from 'react-icons/im';
import { ImUserCheck } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Products } from "../helpers/Products";


const DashProduct = () => {

	return (
      <div className="container-xxl">
         <div className="row">
            <div className={`${style.sidebarContainer} sidebar col-3`}>
               <Sidebar />
            </div>
            <div className={`${style.dashboardContaier} sidebar col-9 px-5`}>
               <div className="header d-flex mt-5 align-items-center justify-content-between">
                  <h1 className={`${style.h1} fw-bold mb-0`}>Dashboard Administrador</h1>
                  <div className="div">
                     <div className="circleUse d-flex align-items-center gap-30">
                        <DarkMode />
                        <FaUserCircle className={style.iconProfle} />
                     </div>
                  </div>
               </div>
               <div className={`${style.userBar} px-4 userbar py-4 d-flex justify-content-between align-items-center mt-5`}>
                  <div className="type">
                     <h1 className='fw-bold mb-0'>Productos</h1>
                  </div>
                  <div className="d-flex gap-30">
                     <div className={`${style.filter} d-flex align-items-center`}>
                        <p className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}>
                           Filtrar por:
                        </p>
                        <select
                           className="form-control form-select"
                           style={{
                              backgroundColor: "transparent",
                              color: "var(--body_color)",
                              border: "0.5px solid var(--border_color)",
                           }}
                           name="filtrar_por"
                           id="filtrar_por"
                        >
                           <option value="default" defaultValue disabled selected>
                              Selecciona
                           </option>
                           <option value="activo">Activo</option>
                           <option value="inactivo">Inactivo</option>
                        </select>
                     </div>
                     <div className={`${style.search} d-flex align-items-center col col-md-6 m-1`}>
                        <p className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}>
                           Buscar producto:
                        </p>
                        <input
                           className="form-control"
                           style={{
                              backgroundColor: "transparent",
                              color: "var(--body_color)",
                              border: "0.5px solid var(--border_color)",
                           }}
                           type="search"
                           name=""
                           id=""
                           placeholder="Buscar"
                        />
                     </div>
                  </div>
               </div>
               <div className={style.table}>
                  <table className="table table-striped table-hover">
                     <thead>
                        <tr>
                           <th scope="col">#</th>
                           <th scope="col">Nombre</th>
                           <th scope="col">Precio</th>
                           <th scope="col">Stock</th>
                           <th scope="col">Estatus</th>
                           <th scope="col">Acciones</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           Products.map((prod) => (
                              <tr>
                                 <th scope="row">1</th>
                                 <td>{prod.name}</td> 
                                 <td>$ {prod.price}</td>
                                 <td>{prod.stock}</td>
                                 <td className='status'>
                                    <div className={`${style.status} ${ prod.status === "activo" ? style.active : style.inactive} ms-4 mt-2`}></div>
                                 </td>
                                 <td>
                                    <div className="icons d-flex gap-10">
                                       <div className="modificarActivo">
                                          {
                                             prod.status === "activo"
                                             ? <ImUserMinus style={{ cursor: "pointer"}} />
                                             : <ImUserCheck style={{ cursor: "pointer"}} />
                                          }
                                       </div>
                                       <div className="delete">
                                          <RiDeleteBin6Line style={{ cursor: "pointer"}} />
                                       </div>
                                       <div className="edit">
                                          <FaEdit style={{ cursor: "pointer"}} />
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                           ))
                        }
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>	
	)
}

export default DashProduct;