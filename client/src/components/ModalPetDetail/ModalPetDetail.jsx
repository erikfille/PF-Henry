import { useState } from 'react'
import style from './ModalPetDetail.module.css';
import { TbPawFilled } from 'react-icons/tb';

const ModalPetDetail = () => {

   const [ isOpen, setIsOpen ] = useState(true);

   const handlerClose = () => {
      setIsOpen(false)
   }

   return (
      <div className={`${style.modalContainer} col-md-8 px-5 py-4`} style={{ display: isOpen ? "block" : "none" }}>
         <div className="boton-close d-flex justify-content-end">
            <button onClick={handlerClose} className={style.buttonLink}>Cerrar</button>
         </div>
         <div className="perfil d-flex flex-column align-items-center">
            <div className="">
               <h1 className={style.title}>Tonky</h1>
            </div>
            <div className={style.circle}>
               <TbPawFilled style={{ width: "80px", height: "80px" }} />
            </div>
         </div>
         <div className='data d-flex justify-content-around'>
            <div className="d-flex flex-column align-items-center">
               <p className={style.data}>Especie</p>
               <p>Perro</p>
            </div>
            <div className="d-flex flex-column align-items-center">
               <p className={style.data}>Fecha de Nac</p>
               <p>26-05-2021</p>
            </div>
         </div>
         <hr style={{opacity: "1", height: "2px"}} />
         <div className="historial py-3 d-flex justify-content-center">
            <h1>Historial</h1>
         </div>
         <div className="hist1">
            <span className={style.data}>Fecha:</span> <span>12/07/22</span> <br/>
            <span className={style.data}>Motivo:</span> <span>Vacuna 1</span>
            <p className={`${style.data} mt-3 mb-0`}>Descripción:</p>
            <p>Se vacuno en la Clínica Veterinaria San Francisco, por el veterinario Oswaldo Petrini</p>
         </div>
         <hr style={{opacity: "1"}} />
         <div className="hist1">
            <span className={style.data}>Fecha:</span> <span>10/11/22</span> <br/>
            <span className={style.data}>Motivo:</span> <span>Vacuna 2</span>
            <p className={`${style.data} mt-3 mb-0`}>Descripción:</p>
            <p>Se vacuno en la Clínica Veterinaria San Francisco, por el veterinario Oswaldo Petrini</p>
         </div>
      </div>
   )
}

export default ModalPetDetail