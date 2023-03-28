import React from "react";
import style from "./ServiceCard.module.css";

export default function ServiceCard(props) {
	return (
		<>
			<div className={`${style.serviceCard} py-4 px-3`}>
				<div className='container-xxl'>
					<div className='row'>
						<div className={`${style.titleContainer} col-6 me-5`}>
							<h5>{props.nombre}</h5>
							<hr />
							<img src={props.image} className='img-fluid' alt='' />
							<p className={`${style.subtitle} mt-3`}>{props.descripcion}</p>
						</div>
						<div className={`${style.contactContainer} col-5`}>
							<h5>CONTACTANOS</h5>
							<hr />
							<p className={`${style.subtitle} mt-3`}>Horarios de atención</p>
							<span>
								Lunes a Viernes {props.horarioAtencion.semana[0]} -{" "}
								{props.horarioAtencion.semana[1]}
							</span>
							<br />
							<span>
								Sabados {props.horarioAtencion.sabado[0]} - {props.horarioAtencion.sabado[1]}
							</span>
							<br />
							<span>Domingo y Festivos {props.horarioAtencion.domingo[0]}</span>
							<p className='mt-4'>
								Contáctenos a <b>{props.mail}</b> o al teléfono <b>{props.telefono}</b> para agendar
								una cita.
							</p>
							<div className='d-flex align-items-center gap-2 my-4'>
								<h5 className='mb-0'>Tipo de servicio:</h5>
								<span>{props.tipo}</span>
							</div>
							<div className='d-flex align-items-center gap-2 mb-4'>
								<h5 className='mb-0'>Dirección:</h5>
								<span>{props.direccion}</span>
							</div>
							<div className='d-flex align-items-center gap-2 mb-4'>
								<h5 className='mb-0'>Pais:</h5>
								<span>{props.pais}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
