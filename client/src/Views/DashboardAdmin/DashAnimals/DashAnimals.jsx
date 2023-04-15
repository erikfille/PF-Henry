import React from 'react';
import style from './DashAnimals.module.css';
import Sidebar from '../Sidebar/Sidebar';
import DarkMode from '../../../components/DarkMode/DarkMode';
import { FaUserCircle } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri';

import { Animals } from "../helpers/Animals";
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';


const DashAnimals = () => {

	return (
      <div className="container-xxl">
         <div className="row">
            <div className={`${style.sidebarContainer} sidebar col-3`}>
               <Sidebar />
            </div>
            <div className={`${style.dashboardContaier} sidebar col-9 px-5`}>
               <HeaderDashboard />
               <div className={`${style.userBar} px-4 userbar py-4 d-flex align-items-center mt-5`}>
                  <div className="type">
                     <h1 className='fw-bold mb-0'>Animales</h1>
                  </div>
                  <div className="d-flex gap-30 w-100 justify-content-end">
                     <div className={`${style.search} d-flex align-items-center col col-md-6 m-1`}>
                        <p className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}>
                           Buscar animal:
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
               <div className="d-flex flex-wrap gap-30">
                  <div className={`${style.table} col-6`}>
                     <table className="table table-striped table-hover">
                        <thead>
                           <tr>
                              <th scope="col">#</th>
                              <th scope="col">Nombre</th>
                              <th scope="col">Acciones</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              Animals.map((animal) => (
                                 <tr>
                                    <th scope="row">1</th>
                                    <td>{animal.name}</td> 
                                    <td>
                                       <div className="icons d-flex gap-10 ms-3">
                                          <div className="delete">
                                             <RiDeleteBin6Line style={{ cursor: "pointer", fill: "var(--color-0CC5BA)"}} />
                                          </div>
                                          <div className="edit">
                                             <FaEdit style={{ cursor: "pointer", fill: "var(--color-0CC5BA)"}} />
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                              ))
                           }
                        </tbody>
                     </table>
                  </div>
                  <div className={`${style.addCategory} col-5`}>
                     <h1 className='fw-bold mb-0'>Agregar nuevo animal</h1>
                     <div class="mb-3 my-5 d-flex gap-30">
                        <div className="name">
                           <label for="especie" className="form-label fw-bold">Especie:</label>
                           <input type="text" className="form-control" id="especie" placeholder="Ingresa la especie"
                           style={{
                              backgroundColor: "transparent",
                              color: "var(--body_color)",
                              border: "0.5px solid var(--border_color)",
                           }} />
                        </div>
                     </div>
                     <button className='button mt-3'>Agregar animal</button>
                  </div>
               </div>
            </div>
         </div>
      </div>	
	)
}

export default DashAnimals;