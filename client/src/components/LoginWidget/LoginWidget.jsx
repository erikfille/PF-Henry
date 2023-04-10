import React, { useState, useEffect } from "react";
import { useLogin } from "../../hooks/useAuth";
import ModalRolSelector from "../ModalRolSelector/ModalRolSelector";
import styles from "./LoginWidget.module.css";
import UploadWidget from "../CreateProduct/UploadWidget";

// Google Auth
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

// Validations
import validation from "./validation";

export default function LoginWidget(props) {
  const { childProps } = props;

  const [loginUser, loginGoogleUser, signUp] = useLogin((state) => [
    state.loginUser,
    state.loginGoogleUser,
    state.signUp,
  ]);

  // Google Auth Data
  const [user, setUser] = useState({});

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    verifyPassword: "",
    image: "",
    rol: "customer",
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
	console.log("Google User", response.profileObj)
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

    console.log(userData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (childProps.type === "login") loginUser(userData);
    if (childProps.type === "signup") {
      let signUpUserData = {
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        password: userData.password,
        image: userData.image,
        rol: userData.rol,
      };
      signUp(signUpUserData);
    }
  }

  function handleSelect(e) {
    setUserData({ ...userData, rol: [e.target.value][0] });
  }

  function onUpload(url) {
    setUserData({ ...userData, image: url });
    console.log(url);
  }

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h1 className={`${styles.fColor} fs-3 fw-bold`}>¡Bienvenido!</h1>
      <p className={`${styles.fColor} fs-6 fw-light`}>
        La mejor forma de cuidar a tu mascota
      </p>
      <div className="col-10 col-sm-8 col-md-8 col-xl-8">
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          {childProps.type === "signup" && (
            <div className="d-flex gap-10">
              <div className="mb-3 w-100">
                <label
                  htmlFor="exampleInputEmail1"
                  className={`${styles.fColor} form-label fw-bold`}
                >
                  Nombre
                </label>
                <input
                  placeholder="Nombre"
                  id="name"
                  name="name"
                  value={userData.user}
                  onChange={handleInputChange}
                  className={`form-control ${errors.nombre && "danger"}`}
                  type="text"
                ></input>
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div className="mb-3 w-100">
                <label
                  htmlFor="exampleInputEmail1"
                  className={`${styles.fColor} form-label fw-bold`}
                >
                  Apellido
                </label>{" "}
                <input
                  placeholder="Apellido"
                  id="surname"
                  name="surname"
                  value={userData.surname}
                  onChange={handleInputChange}
                  className={`form-control ${errors.apellido && "danger"}`}
                  type="text"
                ></input>
                {errors.surname && <p>{errors.surname}</p>}
              </div>
            </div>
          )}
          <div className="d-flex gap-10">
            <div className="mb-3 w-100">
              <label
                htmlFor="email"
                className={`${styles.fColor} form-label fw-bold`}
              >
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
              <label
                htmlFor="exampleInputPassword1"
                className={`${styles.fColor} form-label fw-bold`}
              >
                Contraseña
              </label>
              <input
                placeholder="Ingresa tu contraseña"
                id="password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleInputChange}
                className={`form-control ${errors.password && "danger"}`}
              />{" "}
            </div>
          </div>
          <div className="d-flex gap-10">
            {childProps.type === "signup" && (
              <div className=" w-100 mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label fw-bold"
                >
                  ¿Que querés hacer?
                </label>
                <select
                  name="rol"
                  id="rol"
                  onChange={handleSelect}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="" disabled defaultValue>
                    ¿Qué quieres hacer?
                  </option>
                  <option value="customer">Quiero Comprar</option>
                  <option value="provider">Quiero Vender</option>
                </select>
              </div>
            )}
            {childProps.type === "signup" && (
              <div className="mb-3 w-100">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label fw-bold"
                >
                  Verificar Contraseña
                </label>
                <input
                  placeholder="Verifica tu contraseña"
                  id="verifyPassword"
                  name="verifyPassword"
                  type="password"
                  value={userData.verifyPassword}
                  onChange={handleInputChange}
                  className={`form-control ${errors.password && "danger"}`}
                />
                {errors.password && <p>{errors.password}</p>}
              </div>
            )}
          </div>
          {childProps.type === "signup" && (
            <div className="mb-3 w-100">
              <div className="widgetButton">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className={`${styles.fColor} form-label fw-bold`}
                >
                  Agregá una imagen de Perfil
                </label>
                <UploadWidget
                  onUpload={onUpload}
                  style={{ width: "50px", height: "50px" }}
                />
                <br />
                {userData.image && (
                  <div className="uploadedImage">
                    <img src={userData.image} alt="Uploaded" width="30%" />
                  </div>
                )}
              </div>
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
      <div className="text-center">
        <p className={styles.fColor}>{childProps.message}</p>
        <a className={styles.link} href={childProps.anchorPath}>
          <span>{childProps.accountAnchor}</span>
        </a>
      </div>
      <ModalRolSelector />
    </div>
  );
}
