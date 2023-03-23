import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";
import styles from "./Contacto.module.css";

export default function Contacto() {
	return (
		<div className={styles.contactoContainer}>
			<Meta title={"Contacto"} />
			<BreadCrump title='Contacto' />
			<div className='container-xl mt-5'>
				<div className='row '>
					<form className='col-6'>
						<div className='mb-3 w-75'>
							<label for='formGroupExampleInput' className='form-label'>
								Nombre
							</label>
							<input
								type='text'
								className='form-control'
								id='nameInput'
								placeholder='Ingresa tu nombre'
							/>
						</div>
						<div className='mb-3 w-75'>
							<label for='formGroupExampleInput' className='form-label'>
								Telefono
							</label>
							<input
								type='text'
								className='form-control'
								id='formGroupExampleInput'
								placeholder='Ingresa tu telefono'
							/>
						</div>
						<div class='form-floating w-75'>
							<textarea
								style={{ resize: "none", height: "8rem" }}
								className='form-control mb-3'
								placeholder='Dejanos tu mensaje'
								id='floatingTextarea'></textarea>
						</div>
						<button type='submit' className='btn btn-primary w-75'>
							Submit
						</button>
					</form>

					<div className='col-6'>
						<img
							className='img-fluid'
							src='https://s3-alpha-sig.figma.com/img/d920/3c9e/e606229d590829ac05c1a43ebdf0dd1f?Expires=1680480000&Signature=XxnQBjiIv~EMRgkc8KCqbQXuxIibgpVRLPix6UqpmDWqnjbKtcilWSHBbLelAlWacghnwd0JI9qSnLw5ml7ZiNsulsfFt17LDZIPKUHamjNkm1Ukf4eARuiGk9OzJHRoFCDe9DWhhB3jEPL77jz-RlJvRQ2LWEqP4o2EgSKdfs8RlEK9OyNrGQjYFIv73SUQ5vdzc0azYOazDXYGE9M-nc9PfVAIhtkU-7SNj~p2NUPO3-0x1iLgE3ln1QVos3V7x9Xn~KAFxfQR5WY7KPDOXNvjkpX2YpFF1h8LiIPef4yakzCJFsPvFQ0HksBnkuCacupkwqffPv0ORs41cTYUUg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
							alt=''
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
