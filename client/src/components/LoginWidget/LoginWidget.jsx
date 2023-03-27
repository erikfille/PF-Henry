import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./LoginWidget.module.css";

// Google Auth
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

// Validations
import validation from "./validation";

export default function LoginWidget(props) {
  const { childProps } = props;

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
    let user = {
      user: response.profileObj.email,
      name: response.profileObj.givenName,
      surname: response.profileObj.familyName,
      id: response.profileObj.googleId,
      image: response.profileObj.imageUrl,
    };

    try {
      const response = await axios.post(`/users`, user);
    } catch (err) {
      const response = await axios.post(`/users/login`, user);
    }

    /*
    - Busca al usuario en la base de datos por el mail
        - Si existe el mail, trae la info, crea el token y lo sube al localStorage
        - Si no existe el mail, crea el usuario con la info de Google y lo pasa a otra pagina donde:
            - Se hace un get del usuario creado y se le da a elegir si quiere comprar o quiere vender, para asignarle el rol de usuario.
            - Se agrega la info de rol al estado, se hace un put agregandole el nuevo rol de usuario y se setea el nuevo token, pusheandolo al localStorage.
    */
  };

  const onFailure = () => {
    console.log("something went wrong");
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

    /*
    - Guardado de la info
    - Trae la info del usuario
    - Crea el Token y lo envía al LocalStorage
    */
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="fs-3 fw-bold">¡Bienvenido!</h1>
      <p className="fs-6 fw-light">La mejor forma de cuidar a tu mascota</p>
      <div className="col-10 col-sm-8 col-md-8 col-xl-5">
        <form
          className="d-flex flex-column align-items-center"
          onSubmit={handleSubmit}
        >
          {childProps.type === "signup" && (
            <>
              <div className="mb-3 w-100">
                <label for="exampleInputEmail1" class="form-label fw-bold">
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
                <label for="exampleInputEmail1" class="form-label fw-bold">
                  Apellido
                </label>{" "}
                <input
                  placeholder="Apellido"
                  id="surname"
                  surname="surname"
                  value={userData.user}
                  onChange={handleInputChange}
                  className={`form-control ${errors.apellido && "danger"}`}
                  type="text"
                ></input>
                {errors.surname && <p>{errors.surname}</p>}
              </div>
            </>
          )}

          <div className="mb-3 w-100">
            <label for="exampleInputEmail1" class="form-label fw-bold">
              Email
            </label>
            <input
              placeholder="Ingresa tu email"
              id="mail"
              className={`form-control ${errors.mail && "danger"}`}
              name="mail"
              value={userData.user}
              onChange={handleInputChange}
              type="email"
              aria-describedby="emailHelp"
            />
            {errors.mail && <p>{errors.mail}</p>}
          </div>

          <div class="mb-3 w-100">
            <label for="exampleInputPassword1" class="form-label fw-bold">
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
              class="form-control"
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          {childProps.type === "signup" && (
            <div className=" w-100">
              <select name="rol" id="rol">
                <option value="" disabled selected>
                  ¿Qué quieres hacer?
                </option>
                <option value="customer">Quiero Comprar</option>
                <option value="proveedor">Quiero Vender</option>
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
      <div className="text-center">
        <p>{childProps.message}</p>
        <a href={childProps.anchorPath}>
          <span>{childProps.accountAnchor}</span>
        </a>
      </div>
    </div>
  );
}
