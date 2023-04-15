import React from 'react';
import style from './DashProvider.module.css';
import Sidebar from '../Sidebar/Sidebar';
import DarkMode from '../../../components/DarkMode/DarkMode';
import { FaUserCircle } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { ImUserMinus } from 'react-icons/im';
import { ImUserCheck } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Providers } from "../helpers/Providers";
import { BsFillBoxSeamFill } from "react-icons/bs";
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';



const DashProvider = () => {

	return (
      <div className="container-xxl">
         <div className="row">
            <div className={`${style.sidebarContainer} sidebar col-3`}>
               <Sidebar />
            </div>
            <div className={`${style.dashboardContaier} dashboard col-9 px-5`}>
               <HeaderDashboard />
               <div className={`${style.userBar} px-4 userbar py-4 d-flex justify-content-between align-items-center mt-5`}>
                  <div className="type">
                     <h1 className='fw-bold mb-0'>Proveedores</h1>
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
                           <option value="silver">Silver</option>
                           <option value="gold">Gold</option>
                           <option value="platinum">Platinum</option>
                        </select>
                     </div>
                     <div className={`${style.search} d-flex align-items-center col col-md-6 m-1`}>
                        <p className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}>
                           Buscar proveedor:
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
                           placeholder="Ej. Juan"
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
                           <th scope="col">Apellido</th>
                           <th scope="col">Email</th>
                           <th scope="col">Estatus</th>
                           <th scope="col">Suscripción</th>
                           <th scope="col">Acciones</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           Providers.map((prov) => (
                              <tr>
                                 <th scope="row">1</th   >
                                 <td>{prov.name}</td> 
                                 <td>{prov.surname}</td>
                                 <td>{prov.email}</td>
                                 <td className='status'>
                                    <div className={`${style.status} ${ prov.status === "activo" ? style.active : style.inactive} ms-4 mt-2`}></div>
                                 </td>
                                 <td>
                                    <p className='mb-0'>{prov.suscription}</p>
                                 </td>
                                 <td>
                                    <div className="icons d-flex gap-10">
                                       <div className="modificarActivo">
                                          {
                                             prov.status === "activo"
                                             ? <ImUserMinus style={{ cursor: "pointer", fill: "var(--color-0CC5BA)"}} />
                                             : <ImUserCheck style={{ cursor: "pointer", fill: "var(--color-0CC5BA)"}} />
                                          }
                                       </div>
                                       <div className="delete">
                                          <RiDeleteBin6Line style={{ cursor: "pointer", fill: "var(--color-0CC5BA)"}} />
                                       </div>
                                       <div className="edit">
                                          <FaEdit style={{ cursor: "pointer", fill: "var(--color-0CC5BA)"}} />
                                       </div>
                                       <div className="product">
                                          <BsFillBoxSeamFill style={{ cursor: "pointer", fill: "var(--color-0CC5BA)"}} />
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

export default DashProvider;