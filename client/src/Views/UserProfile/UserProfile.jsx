import Meta from "../../components/Meta/Meta";
import BreadCrump from "../../components/BreadCrump/BreadCrump";
import style from "./UserProfile.module.css";
import { Link } from "react-router-dom";
import { user } from "./userHelp";
import { FaUserAlt } from 'react-icons/fa';
import PetsContainer from "../../components/PetsContainer/PetsContainer";

// objetos hardcodeados
import { pets, compras } from "../../components/PetData/petHelp";



export default function UserProfile() {

   return (
      <>
         <Meta title={"Perfil"} />
         <BreadCrump title="Perfil" />
         <div className="userProfile-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
               <div className="row d-flex flex-column align-items-center">
                  <div className={`${style.userContainer} col-10 bg-white p-5 my-5`}>
                  <div className="d-flex justify-content-end">
                     <Link to="" className={style.linkEdit}>Editar perfil</Link>
                  </div>
                  <div className="d-flex justify-content-center">
                     {
                        user.map((u) => 
                        <>
                           <div className="col-4">
                              <div className={style.circle}>
                                 <FaUserAlt style={{ width: "140px", height: "140px" }} />
                                 {/* <img src={u.imagen} alt="user-imagen" className={style.imgUser} /> */}
                              </div>
                           </div>
                           <div className="col-7">
                              <div className={style.nameContainer}>
                              <p className={style.name}>{u.name} {u.surname}</p>
                              </div>
                              <div className='d-flex align-items-center gap-2 mb-4'>
                              <h4 className='mb-0'>Email:</h4>
                              <span>{u.email}</span>
                              </div>
                              <div className='d-flex align-items-center gap-2 mb-4'>
                              <h4 className='mb-0'>Dirección:</h4>
                              <span>{u.address}</span>
                              </div>
                           </div>
                        </>
                        )
                     }
                  </div>
                  </div>
                  <button className="button" style={{width: "150px"}}>Agregar Mascota</button>
                  <div className={`${style.petsContainer} col-10 bg-white p-5 my-5`}>
                     <h4>Mis Mascotas:</h4>
                     {
                        pets.length === 0
                        ? 
                        <>
                           <div className='d-flex justify-content-center align-items-center my-5'>
                              <h6>No tienes mascotas agregadas</h6>
                           </div>
                        </>
                        :
                        <>
                           <div className={`${style.pets} d-flex flex-wrap gap-5 py-5`}>
                              <PetsContainer />
                           </div>
                        </>
                     }
                  </div>
                  <div className={`${style.comprasContainer} col-10 bg-white p-5 my-5`}>
                     <h4>Mis Compras:</h4>
                     {
                        compras.length === 0
                        ? 
                        <>
                           <div className='d-flex flex-column justify-content-center align-items-center my-5'>
                              <h6>Aún no tienes compras</h6>
                              <Link to="" className={style.link}>Ir a tienda</Link>
                           </div>
                        </>
                        :
                        <>
                           <div className={`${style.pets} d-flex flex-wrap gap-5 py-5`}>
                              <PetsContainer />
                              {/* renderizar las compras hechas por el cliente */}
                           </div>
                        </>
                     }
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
