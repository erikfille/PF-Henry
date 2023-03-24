import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";
import styles from "./Faqs.module.css";

export default function Faqs() {
	return (
		<div>
			<Meta title={"Faqs"} />
			<BreadCrump title='Faqs' />
			<div className='container accordion' id='faqs'>
				<div className='accordion-item'>
					<h2 className='accordion-header fw-bold' id='headingOne'>
						<button
							className={`accordion-button fw-bold ${styles.button}`}
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseOne'
							aria-expanded='true'
							aria-controls='collapseOne'>
							¿Tienen en venta productos para perros y gatos?
						</button>
					</h2>
					<div
						id='collapseOne'
						className='accordion-collapse collapse show'
						aria-labelledby='headingOne'
						data-bs-parent='#accordionExample'>
						<div className='accordion-body'>
							¡Por supuesto! Tenemos una amplia variedad de productos para mascotas, tanto para
							perros como para gatos. Desde alimentos de alta calidad hasta juguetes y accesorios,
							¡seguro que encontrará algo que le guste para su mascota!
						</div>
					</div>
				</div>
				<div className='accordion-item'>
					<h2 className='accordion-header' id='headingTwo'>
						<button
							className={`accordion-button collapsed  fw-bold ${styles.button}`}
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseTwo'
							aria-expanded='false'
							aria-controls='collapseTwo'>
							¿Cuál es el mejor alimento para mi perro?
						</button>
					</h2>
					<div
						id='collapseTwo'
						className='accordion-collapse collapse'
						aria-labelledby='headingTwo'
						data-bs-parent='#accordionExample'>
						<div className='accordion-body'>
							La mejor opción de alimento para su perro dependerá de muchos factores, como la edad,
							el tamaño, la raza y el nivel de actividad. Nuestro equipo de expertos en nutrición
							para mascotas puede ayudarlo a encontrar la mejor opción de alimento para su perro.
							Puede comunicarse con nosotros por correo electrónico o por teléfono para obtener más
							información.
						</div>
					</div>
				</div>
				<div className='accordion-item'>
					<h2 className='accordion-header' id='headingThree'>
						<button
							className={`accordion-button collapsed  fw-bold ${styles.button}`}
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseThree'
							aria-expanded='false'
							aria-controls='collapseThree'>
							¿Venden productos para mascotas exóticas?
						</button>
					</h2>
					<div
						id='collapseThree'
						className='accordion-collapse collapse'
						aria-labelledby='headingThree'
						data-bs-parent='#accordionExample'>
						<div className='accordion-body'>
							Sí, vendemos productos para mascotas exóticas, como pájaros, reptiles y roedores.
							Tenemos una amplia variedad de alimentos, juguetes y accesorios para satisfacer las
							necesidades de sus mascotas exóticas.
						</div>
					</div>
				</div>
				<div className='accordion-item'>
					<h2 className='accordion-header' id='headingThree'>
						<button
							className={`accordion-button collapsed fw-bold ${styles.button}`}
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#collapseThree'
							aria-expanded='false'
							aria-controls='collapseThree'>
							¿Tienen servicios de entrenamiento para perros?
						</button>
					</h2>
					<div
						id='collapseThree'
						className='accordion-collapse collapse'
						aria-labelledby='headingThree'
						data-bs-parent='#accordionExample'>
						<div className='accordion-body'>
							Sí, ofrecemos servicios de entrenamiento para perros. Nuestros entrenadores de perros
							altamente capacitados pueden ayudarlo a entrenar a su perro en obediencia básica,
							trucos divertidos y más. Puede comunicarse con nosotros por correo electrónico o por
							teléfono para programar una sesión de entrenamiento.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
