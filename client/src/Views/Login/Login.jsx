import React from "react";
import LoginWidget from "../../components/LoginWidget/LoginWidget";
import { useLocation } from "react-router-dom";

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
		<div className={styles.container}>
			<div className='row'>
				<div className='col-6'>
					<LoginWidget childProps={childProps} />
				</div>
				<div className='col-6 d-flex justify-content-center d-none d-md-inline'>
					<img
						className={styles.image}
						src='https://s3-alpha-sig.figma.com/img/82a7/9700/fabe12b980b487480fe1006bf606bfaf?Expires=1680480000&Signature=PuHKX0yoTQhR-gCDKgDcf4Ef29MSBhfLZbKbQl2Cg4bJpDKFhNTcJzRK3uepdS0tCMhEKVP1mfl9CYUQnedRJ2kSK3tOWlt8C8liKwp5iF2wY6~IjWpkFCy5HgE5iVEk7x3ZaoZGm2ZswtEBKCQR9etXza0YUTfUxwMe-gR07b~y7ZIhYvL56Um47eJcqmSgXAS5NBFEuHA-sYMWvIN5mezOuSZaMZ9YLZjkC1EjU~M9TTvQDb3FfuX~HrTN3a~ebId7U34mJFZ2ddCnpC9pCu0MTeEZ9d227nGgkTVFO-CvLXVhHHe94aTEK5JqH9w5r-zrSr~SHvJ4kp0XtiMgxw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
}
