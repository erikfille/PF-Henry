import React from "react";
import LoginWidget from "../../components/LoginWidget/LoginWidget";
import { useLocation } from "react-router-dom";
import loginDog from "../../../public/images/login-dog.jpeg";

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

	// TO DO: depende si entra en login, sign up o forgot password
	// deberia cambiar la img

	return (
		<div className={styles.loginContainer}>
			<div className='row'>
				<div
					className={`col-12 col-md-6 col-xl-7 d-flex justify-content-center align-items-center ${styles.formContainer}`}>
					<LoginWidget childProps={childProps} />
				</div>
				<div
					className={`col-6 col-md-6 col-xl-5 d-none d-sm-flex position-relative ${styles.imgContainer}`}>
					<img
						className={`position-absolute top-50 start-50 translate-middle w-100 ${styles.image}`}
						src={loginDog}
						alt=''
					/>
				</div>
			</div>
		</div>
	);
}
