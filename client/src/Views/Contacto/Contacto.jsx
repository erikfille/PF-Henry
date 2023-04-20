import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";
import styles from "./Contacto.module.css";
import imgCat from "../../images/bg-cat.jpg"

import { useModal } from "../../hooks/useStore";

export default function Contacto() {
	const [setModalInfo] = useModal((state) => [state.setModalInfo]);


	const onContinue = (arg) => {
		window.location.href = arg;
	};

	return (
		<div>
			<Meta title={"Contacto"} />
			<BreadCrump title="Contacto" />
			<div className={`home-wrapper-2 ${styles.contactoContainer} pb-5`}>
				<h1 className="container-xl text-center fw-bold pt-5 pb-1">
					¡Mantente siempre en contacto con nosotros!
				</h1>
				<div className="container-xl mt-5">
					<div className="row py-2">
						<form
							className={`${styles.contact} col-12 col-md-6 col-xxl-5 d-flex flex-column align-items-center py-4`}>
							<div className="mb-3  col-12 col-md-9">
								<label
									htmlFor="formGroupExampleInput"
									className={`${styles.label} form-label fw-bold`}>
									Nombre
								</label>
								<input
									type="text"
									className="form-control"
									id="nameInput"
									placeholder="Ingresa tu nombre"
									style={{
										backgroundColor: "var(--body_background)",
										color: "var(--body_color)",
										border: "0.5px solid var(--border_color)",
									}}
								/>
							</div>
							<div className="mb-3 col-12 col-md-9 ">
								<label
									htmlFor="formGroupExampleInput"
									className={`${styles.label} form-label fw-bold`}>
									Telefono
								</label>
								<input
									type="text"
									className="form-control"
									id="formGroupExampleInput"
									placeholder="Ingresa tu telefono"
									style={{
										backgroundColor: "var(--body_background)",
										color: "var(--body_color)",
										border: "0.5px solid var(--border_color)",
									}}
								/>
							</div>
							<div className="mb-3 col-12 col-md-9 ">
								<label
									htmlFor="formGroupExampleInput"
									className={`${styles.label} form-label fw-bold`}>
									Email
								</label>
								<input
									type="email"
									className="form-control"
									id="formGroupExampleInput"
									placeholder="Ingresa tu email"
									style={{
										backgroundColor: "var(--body_background)",
										color: "var(--body_color)",
										border: "0.5px solid var(--border_color)",
									}}
								/>
							</div>
							<div class="mb-3 col-12 col-md-9">
								<label
									htmlFor="exampleFormControlTextarea1"
									class={`${styles.label} form-label fw-bold`}>
									Dejanos tu mensaje
								</label>
								<textarea
									className="form-control"
									id="exampleFormControlTextarea1"
									rows="3"
									style={{
										resize: "none",
										height: "8rem",
										backgroundColor: "var(--body_background)",
										color: "var(--body_color)",
										border: "0.5px solid var(--border_color)",
									}}
									placeholder="Dejanos tu mensaje"></textarea>
							</div>
							<button
								type="submit"
								className={`btn btn-primary col-12 col-md-9 fw-bold ${styles.button}`}
								onClick={(event) => {
									event.preventDefault(); // Evita que se envíe el formulario automáticamente
									setModalInfo(
									"Mensaje enviado con éxito",
									"Gracias por ponerte en contacto con PetsAmérica.",
									onContinue,
									["/"]
									);
								}}
								>
								Enviar
							</button>
						</form>
						<div
							className={`col-12 col-md-6 col-xxl-5 d-none d-sm-block ${styles.imageContainer}`}>
							<img
								className={`img-fluid ${styles.image}`}
								src={imgCat}
								alt="cat pic"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
