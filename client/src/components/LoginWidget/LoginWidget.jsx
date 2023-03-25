import React, { useState, useEffect } from "react";
import axios from "axios";

// Google Auth
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

// Validations
import validation from "./validation";

const logoImage = "../../../public/images/logo-pet.png";

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
    <div className="widgetContainer">
      <div className="loginLogo">
        <img src={logoImage} alt="logoApp" />
      </div>
      <h1 className="loginTitle">¡Bienvenido a Pet App!</h1>
      <hr />
      <p>Ingrese sus datos para acceder</p>
      <div className="loginFormContainer">
        <form onSubmit={handleSubmit}>
          {childProps.type === "signup" && (
            <>
              <div>
                <input
                  placeholder="Nombre"
                  id="name"
                  name="name"
                  value={userData.user}
                  onChange={handleInputChange}
                  className={errors.name && "danger"}
                  type="text"
                ></input>
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div>
                <input
                  placeholder="Apellido"
                  id="surname"
                  surname="surname"
                  value={userData.user}
                  onChange={handleInputChange}
                  classsurname={errors.surname && "danger"}
                  type="text"
                ></input>
                {errors.surname && <p>{errors.surname}</p>}
              </div>
            </>
          )}

          <div>
            <input
              placeholder="Email"
              id="mail"
              name="mail"
              value={userData.user}
              onChange={handleInputChange}
              className={errors.mail && "danger"}
              type="text"
            ></input>
            {errors.mail && <p>{errors.mail}</p>}
          </div>
          <div>
            <input
              placeholder="Contraseña"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className={errors.password && "danger"}
              type="password"
            ></input>
            {errors.password && <p>{errors.password}</p>}
          </div>
          {childProps.type === "signup" && (
            <div>
              <select name="rol" id="rol">
                <option value="" disabled selected>
                  ¿Qué quieres hacer?
                </option>
                <option value="customer">Quiero Comprar</option>
                <option value="proveedor">Quiero Vender</option>
              </select>
            </div>
          )}
          <hr />
          <button className="loginButton">{childProps.button}</button>
        </form>
      </div>
      <div className="loginGoogleAuth">
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_policy"}
        />
      </div>
      <div className="loginOrSignup">
        <p>{childProps.message}</p>
        <a href={childProps.anchorPath}>
          <span>{childProps.accountAnchor}</span>
        </a>
      </div>
    </div>
  );
}
