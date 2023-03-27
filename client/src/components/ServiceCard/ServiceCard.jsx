import React from 'react'
import style from "./ServiceCard.module.css"

export default function ServiceCard(props) {
  return (
    <>
      <div className={`${style.serviceCard} py-4 px-3`}>
        <div className='container-xxl'>
          <div className='row'>
            <div className={`${style.titleContainer} col-6 me-5`}>
              <h5>{props.title}</h5>
              <hr />
              <img src={props.image} className="img-fluid" alt="" />
              <p className={`${style.subtitle} mt-3`}>La clínica veterinaria es una unidad de servicio completo y distribuidor de alimentos recetados.</p>
              <p>Brinde a sus mascotas la mejor atención médica en nuestra Clínica Veterinaria. Cuando se trata de tu mascota, no hay mayor prioridad que mantenerla feliz y saludable en todo momento.</p>
              <p>Es una práctica veterinaria completa operada por la experimentada cirujana veterinaria Dra. Candice Cooper (BVSc).</p>
            </div>
            <div className={`${style.contactContainer} col-5`}>
                <h5>CONTACTANOS</h5>
                <hr />
                <p>Las mascotas con problemas dietéticos también pueden ser atendidas con receta médica u otros productos veterinarios.</p>
                <p className={`${style.subtitle} mt-3`}>Horarios de atención</p>
                <span>Lunes a Sábado  09:00 - 16:00</span><br />
                <span>Domingo y Festivos (previa cita) 09:00 - 14:00</span>
                <p className='mt-4'>Contáctenos a <b>atencion@petsamerica.com</b> o a los teléfonos <b>+123 456-6875</b> para agendar una cita.</p>
                <div className='d-flex align-items-center gap-2 my-4'>
                  <h5 className='mb-0'>Tipo de servicio:</h5>
                  <span>{props.service}</span>
                </div>
                <div className='d-flex align-items-center gap-2 mb-4'>
                  <h5 className='mb-0'>Localidad:</h5>
                  <span>{props.country}</span>
                </div>
                <div className='d-flex align-items-center gap-2 mb-4'>
                  <h5 className='mb-0'>Dirección:</h5>
                  <span>{props.address}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
