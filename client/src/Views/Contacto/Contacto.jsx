import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";
import styles from "./Contacto.module.css";
import imgCat from "../../images/bg-cat.jpg"
import axios from "axios";
import { useModal } from "../../hooks/useStore";
import { useState } from "react";

export default function Contacto() {
	const [setModalInfo] = useModal((state) => [state.setModalInfo]);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  })

	const onContinue = (arg) => {
		window.location.href = arg;
	};

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const onSubmit = async (e) =>{
    e.preventDefault();
    try {
      await axios.post("/contact", formData)
      setModalInfo(
        "Mensaje enviado con éxito",
        "Gracias por ponerte en contacto con PetsAmérica. Pronto te estaremos contactando via e-mail",
        onContinue,
        ["/"]
        );
    } catch (error) {
      console.log(error)
    }
  }

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
              onSubmit={onSubmit}
							className={`${styles.contact} col-12 col-md-6 col-xxl-5 d-flex flex-column align-items-center py-4`}>
							<div className="mb-3  col-12 col-md-9">
								<label
									htmlFor="formGroupExampleInput"
									className={`${styles.label} form-label fw-bold`}>
									Nombre
								</label>
								<input
                  name="nombre"
									type="text"
									className="form-control"
									id="nameInput"
									placeholder="Ingresa tu nombre"
									style={{
										backgroundColor: "var(--body_background)",
										color: "var(--body_color)",
										border: "0.5px solid var(--border_color)",
									}}
                  onChange={handleInputChange}
								/>
							</div>
							<div className="mb-3 col-12 col-md-9 ">
								<label
									htmlFor="formGroupExampleInput"
									className={`${styles.label} form-label fw-bold`}>
									Email
								</label>
								<input
                  name="email"
									type="email"
									className="form-control"
									id="formGroupExampleInput"
									placeholder="Ingresa tu email"
									style={{
										backgroundColor: "var(--body_background)",
										color: "var(--body_color)",
										border: "0.5px solid var(--border_color)",
									}}
                  onChange={handleInputChange}
								/>
							</div>
							<div className="mb-3 col-12 col-md-9">
								<label
									htmlFor="exampleFormControlTextarea1"
									className={`${styles.label} form-label fw-bold`}>
									Dejanos tu mensaje
								</label>
								<textarea
                  name="mensaje"
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
                  onChange={handleInputChange}
									placeholder="Dejanos tu mensaje"></textarea>
							</div>
							<button
								type="submit"
								className={`btn btn-primary col-12 col-md-9 fw-bold ${styles.button}`}>
								Enviar
							</button>
						</form>
						<div
							className={`col-12 col-md-6 col-xxl-5 d-none d-md-block ${styles.imageContainer}`}>
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
