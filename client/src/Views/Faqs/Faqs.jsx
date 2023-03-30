import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";
import styles from "./Faqs.module.css";

export default function Faqs() {
	return (
		<div>
			<Meta title={"Faqs"} />
			<BreadCrump title='Faqs' />
			<div className='home-wrapper-2 col-12 d-flex flex-column align-items-center'>
				<h1 className='fw-bold py-5 text-center mx-5'>
					Ayuda y preguntas frecuentes para cuidar a tu mascota
				</h1>
				<div className={`${styles.containerFaq} col-10 bg-white mb-5 p-5`}>
					<div className='container-xl accordion accordion-flush' id='accordionFlushExample'>
						<div className={`accordion-item my-4 ${styles.questionContainer}`}>
							<h2 className='accordion-header'>
								<button
									className={`accordion-button collapsed fw-bold ${styles.button}`}
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#flush-collapseOne'
									aria-expanded='false'
									aria-controls='flush-collapseOne'>
									¿Tienen en venta productos para perros y gatos?
								</button>
							</h2>
							<div
								id='flush-collapseOne'
								className='accordion-collapse collapse'
								data-bs-parent='#accordionFlushExample'>
								<div className={`accordion-body ${styles.response}`}>
									¡Por supuesto! Tenemos una amplia variedad de productos para mascotas, tanto para
									perros como para gatos. Desde alimentos de alta calidad hasta juguetes y accesorios,
									¡seguro que encontrará algo que le guste para su mascota!
								</div>
							</div>
						</div>
						<div className={`accordion-item my-4 ${styles.questionContainer}`}>
							<h2 className='accordion-header'>
								<button
									className={`accordion-button collapsed fw-bold ${styles.button}`}
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#flush-collapseTwo'
									aria-expanded='false'
									aria-controls='flush-collapseTwo'>
									¿Cuál es el mejor alimento para mi perro?
								</button>
							</h2>
							<div
								id='flush-collapseTwo'
								className='accordion-collapse collapse'
								data-bs-parent='#accordionFlushExample'>
								<div className='accordion-body'>
									La mejor opción de alimento para su perro dependerá de muchos factores, como la
									edad, el tamaño, la raza y el nivel de actividad. Nuestro equipo de expertos en
									nutrición para mascotas puede ayudarlo a encontrar la mejor opción de alimento para
									su perro. Puede comunicarse con nosotros por correo electrónico o por teléfono para
									obtener más información.
								</div>
							</div>
						</div>
						<div className={`accordion-item my-4 ${styles.questionContainer}`}>
							<h2 className='accordion-header'>
								<button
									className={`accordion-button collapsed fw-bold ${styles.button}`}
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#flush-collapseThree'
									aria-expanded='false'
									aria-controls='flush-collapseThree'>
									¿Venden productos para mascotas exóticas?
								</button>
							</h2>
							<div
								id='flush-collapseThree'
								className='accordion-collapse collapse'
								data-bs-parent='#accordionFlushExample'>
								<div className='accordion-body'>
									Sí, vendemos productos para mascotas exóticas, como pájaros, reptiles y roedores.
									Tenemos una amplia variedad de alimentos, juguetes y accesorios para satisfacer las
									necesidades de sus mascotas exóticas.
								</div>
							</div>
						</div>
						<div className={`accordion-item my-4 ${styles.questionContainer}`}>
							<h2 className='accordion-header'>
								<button
									className={`accordion-button collapsed fw-bold ${styles.button}`}
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#flush-collapseFour'
									aria-expanded='false'
									aria-controls='flush-collapseFour'>
									¿Venden camas para mascotas?
								</button>
							</h2>
							<div
								id='flush-collapseFour'
								className='accordion-collapse collapse'
								data-bs-parent='#accordionFlushExample'>
								<div className='accordion-body'>
									Sí, tenemos una amplia variedad de camas para mascotas disponibles. Desde camas para
									perros pequeños hasta camas para perros grandes y acolchonadas, ¡seguro que
									encontrará la cama perfecta para su mascota en nuestro sitio web!
								</div>
							</div>
						</div>
						<div className={`accordion-item my-4 ${styles.questionContainer}`}>
							<h2 className='accordion-header'>
								<button
									className={`accordion-button collapsed fw-bold ${styles.button}`}
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#flush-collapseFive'
									aria-expanded='false'
									aria-controls='flush-collapseFive'>
									¿Ofrecen servicios de cuidado de mascotas?
								</button>
							</h2>
							<div
								id='flush-collapseFive'
								className='accordion-collapse collapse'
								data-bs-parent='#accordionFlushExample'>
								<div className='accordion-body'>
									Sí, ofrecemos servicios de cuidado de mascotas. Si necesita un cuidador para su
									mascota mientras está fuera de casa, nuestro equipo puede ayudarlo a encontrar a
									alguien confiable y calificado para cuidar de su mascota. Comuníquese con nosotros
									para obtener más información.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
