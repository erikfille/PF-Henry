import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";
import styles from "./Contacto.module.css";

export default function Contacto() {
	return (
		<div>
			<Meta title={"Contacto"} />
			<BreadCrump title='Contacto' />
			<div className={` home-wrapper-2 ${styles.contactoContainer}`}>
				<h1 className='container-xl text-center fw-bold pt-5 pb-1'>
					¡Mantente siempre en contacto con nosotros!
				</h1>
				<div className='container-xl mt-5'>
					<div className='row py-2'>
						<form className='col-12 col-md-6 col-xxl-5 d-flex flex-column align-items-center bg-white py-4'>
							<div className='mb-3  col-12 col-md-9'>
								<label for='formGroupExampleInput' className='form-label fw-bold'>
									Nombre
								</label>
								<input
									type='text'
									className='form-control'
									id='nameInput'
									placeholder='Ingresa tu nombre'
								/>
							</div>
							<div className='mb-3 col-12 col-md-9 '>
								<label for='formGroupExampleInput' className='form-label fw-bold'>
									Telefono
								</label>
								<input
									type='text'
									className='form-control'
									id='formGroupExampleInput'
									placeholder='Ingresa tu telefono'
								/>
							</div>
							<div class='mb-3 col-12 col-md-9'>
								<label for='exampleFormControlTextarea1' class='form-label fw-bold'>
									Dejanos tu mensaje
								</label>
								<textarea
									className='form-control'
									id='exampleFormControlTextarea1'
									rows='3'
									style={{ resize: "none", height: "8rem" }}
									placeholder='Dejanos tu mensaje'></textarea>
							</div>
							<button
								type='submit'
								className={`btn btn-primary col-12 col-md-9 fw-bold ${styles.button}`}>
								Enviar
							</button>
						</form>
						<div className={`col-12 col-md-6 col-xxl-5 d-none d-sm-block ${styles.imageContainer}`}>
							<img
								className={`img-fluid ${styles.image}`}
								src='https://s3-alpha-sig.figma.com/img/d920/3c9e/e606229d590829ac05c1a43ebdf0dd1f?Expires=1680480000&Signature=XxnQBjiIv~EMRgkc8KCqbQXuxIibgpVRLPix6UqpmDWqnjbKtcilWSHBbLelAlWacghnwd0JI9qSnLw5ml7ZiNsulsfFt17LDZIPKUHamjNkm1Ukf4eARuiGk9OzJHRoFCDe9DWhhB3jEPL77jz-RlJvRQ2LWEqP4o2EgSKdfs8RlEK9OyNrGQjYFIv73SUQ5vdzc0azYOazDXYGE9M-nc9PfVAIhtkU-7SNj~p2NUPO3-0x1iLgE3ln1QVos3V7x9Xn~KAFxfQR5WY7KPDOXNvjkpX2YpFF1h8LiIPef4yakzCJFsPvFQ0HksBnkuCacupkwqffPv0ORs41cTYUUg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
								alt='cat pic'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
