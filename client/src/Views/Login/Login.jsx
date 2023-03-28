import React from "react";
import LoginWidget from "../../components/LoginWidget/LoginWidget";
import { useLocation } from "react-router-dom";
import loginDog from "../../assets/img/login/login-dog.jpeg";
import signUpCat from "../../assets/img/login/signUp-cat.jpeg";

import styles from "./Login.module.css";

export default function Login() {
	const location = useLocation();

	const actualLocation = location.pathname;

	let childProps = {};

	if (location.pathname === "/login") {
		childProps = {
			type: "login",
			subtitle: "Ingrese sus datos para acceder",
			button: "Ingresar",
			message: "¿No tienes cuenta?",
			accountAnchor: "¡Crea una cuenta ahora mismo!",
			anchorPath: "/signup",
		};
	}

	if (location.pathname === "/signup") {
		childProps = {
			type: "signup",
			subtitle: "Ingrese sus datos para registrarse",
			button: "Registrate",
			message: "¿Ya tienes cuenta?",
			accountAnchor: "Ir al Login",
			anchorPath: "/login",
		};
	}

	return (
		<div className={styles.loginContainer}>
			<div className='row'>
				<div
					className={`col-12 col-md-6 col-xl-7 d-flex justify-content-center align-items-center ${styles.formContainer}`}>
					<h1 className='fw-bold position-absolute top-0 start-0 m-4'>PetsAmerica</h1>
					<LoginWidget childProps={childProps} />
				</div>

				<div
					className={`col-6 col-md-6 col-xl-5 d-none d-md-flex position-relative ${styles.imgContainer}`}>
					<img
						className={`position-absolute top-50 start-50 translate-middle w-100 ${styles.image}`}
						src={actualLocation === "/login" ? loginDog : signUpCat}
						alt=''
					/>
				</div>
			</div>
		</div>
	);
}
