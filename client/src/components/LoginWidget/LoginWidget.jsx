import React, { useState, useEffect } from "react";
import { useLogin } from "../../hooks/useAuth";
import ModalRolSelector from "../ModalRolSelector/ModalRolSelector";
import styles from "./LoginWidget.module.css";

// Google Auth
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

// Validations
import validation from "./validation";

export default function LoginWidget(props) {
	const { childProps } = props;

	const [loginUser, loginGoogleUser] = useLogin((state) => [
		state.loginUser,
		state.loginGoogleUser,
	]);

	// Google Auth Data
	const [user, setUser] = useState({});

	const [userData, setUserData] = useState({
		name: "",
		surname: "",
		email: "",
		password: "",
		rol: "",
	});

	// Own Auth Data
	const [errors, setErrors] = useState({
		user: "",
		password: "",
	});

	// Google Auth Logic
	const clientID =
		"756465634743-0hd8ke48er3tkrt4siag4o30m7h73a8c.apps.googleusercontent.com";

	useEffect(() => {
		const start = () => {
			gapi.auth2.init({
				clientId: clientID,
			});
		};
		gapi.load("client:auth2", start);
	}, []);

	const onSuccess = async (response) => {
		console.log(response);
		// Esto mando al loguear por google.
		// Se verifica el mail y la contraseña y si no existen en la db, se crea el usuario y se devuelve, sin el rol.
		let user = {
			email: response.profileObj.email,
			password: response.profileObj.googleId,
			name: response.profileObj.givenName,
			surname: response.profileObj.familyName,
			image: response.profileObj.imageUrl,
		};
		try {
			// Mando todo al back
			loginGoogleUser(user);
		} catch (err) {
			console.log(err);
		}
	};

	const onFailure = () => {
		console.log("Ups... Something went wrong");
	};

	// Own Auth Logic
	function handleInputChange(e) {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});

		setErrors(
			validation({
				...userData,
				[e.target.name]: e.target.value,
			})
		);
	}

	function handleSubmit(e) {
		e.preventDefault();
		loginUser(userData);
	}

	return (
		<div className="container d-flex flex-column align-items-center mt-5">
			<h1 className="fs-3 fw-bold">¡Bienvenido!</h1>
			<p className="fs-6 fw-light">La mejor forma de cuidar a tu mascota</p>
			<div className="col-11 col-sm-8 col-md-11 col-lg-9 col-xl-6">
				<form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
					{childProps.type === "signup" && (
						<div className="d-flex gap-10 col-12">
							<div className="mb-3 w-100">
								<label htmlFor="exampleInputEmail1" className="form-label fw-bold">
									Nombre
								</label>
								<input
									placeholder="Nombre"
									id="name"
									name="name"
									value={userData.user}
									onChange={handleInputChange}
									className={`form-control ${errors.nombre && "danger"}`}
									type="text"></input>
								{errors.name && <p>{errors.name}</p>}
							</div>
							<div className="mb-3 w-100">
								<label htmlFor="exampleInputEmail1" className="form-label fw-bold">
									Apellido
								</label>{" "}
								<input
									placeholder="Apellido"
									id="surname"
									surname="surname"
									value={userData.user}
									onChange={handleInputChange}
									className={`form-control ${errors.apellido && "danger"}`}
									type="text"></input>
								{errors.surname && <p>{errors.surname}</p>}
							</div>
						</div>
					)}
					<div className="mb-3 w-100">
						<label htmlFor="email" className="form-label fw-bold">
							Email
						</label>
						<input
							placeholder="Ingresa tu email"
							id="email"
							className={`form-control ${errors.email && "danger"}`}
							name="email"
							value={userData.user}
							onChange={handleInputChange}
							type="email"
							aria-describedby="emailHelp"
						/>
						{errors.mail && <p>{errors.mail}</p>}
					</div>

					<div className="mb-3 w-100">
						<label htmlFor="exampleInputPassword1" className="form-label fw-bold">
							Password
						</label>
						<input
							placeholder="Ingresa tu contraseña"
							id="password"
							name="password"
							type="password"
							value={userData.password}
							onChange={handleInputChange}
							className={`form-control ${errors.password && "danger"}`}
						/>
						{errors.password && <p>{errors.password}</p>}
					</div>
					{childProps.type === "signup" && (
						<div className=" w-100 mb-3">
							<select
								name="rol"
								id="rol"
								className="form-select"
								aria-label="Default select example">
								<option value="" disabled defaultValue>
									¿Qué quieres hacer?
								</option>
								<option value="customer">Quiero Comprar</option>
								<option value="provider">Quiero Vender</option>
							</select>
						</div>
					)}
					<button className="button w-100 mb-3">{childProps.button}</button>
					<div className="w-100">
						<GoogleLogin
							className={`mb-3 w-100 ${styles.buttonGoogle}`}
							clientId={clientID}
							onSuccess={onSuccess}
							onFailure={onFailure}
							cookiePolicy={"single_host_policy"}
						/>
					</div>
				</form>
			</div>
			<div className="text-center d-inline-flex">
				<p className="mx-3">{childProps.message}</p>
				<a className={styles.link} href={childProps.anchorPath}>
					<span>{childProps.accountAnchor}</span>
				</a>
			</div>
			<ModalRolSelector />
		</div>
	);
}
