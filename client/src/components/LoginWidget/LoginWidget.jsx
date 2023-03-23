import React, { useState, useEffect } from "react";

// Google Auth
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

// Validations
import validation from "./validation";

const logoImage = "../../../public/images/logo-pet.png";

export default function LoginWidget() {
  // Google Auth Data
  const [user, setUser] = useState({});

  const [userData, setUserData] = useState({
    username: "",
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

  const onSuccess = (response) => {
    console.log(response);
    //Guarda la info del usuario
    setUser(response);
    /*
    - Busca al usuario en la base de datos por el mail
        - Si existe el mail, trae la info, crea el token y lo sube al localStorage
        - Si no existe el mail, crea el usuario con la info de Google y lo pasa a otra pagina donde:
            - Se le da a elegir si quiere comprar o quiere vender, para asignarle el rol de usuario.
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
      <div className="loginFormContainer">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              name="username"
              value={userData.user}
              onChange={handleInputChange}
              className={errors.username && "danger"}
              type="text"
            ></input>
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className={errors.password && "danger"}
              type="password"
            ></input>
            {errors.password && <p>{errors.password}</p>}
          </div>
          <hr />
          <button className="loginButton">Ingresar</button>
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
      <div className="loginToSignup">
        <p>¿No tienes una cuenta?</p>
        <a href="/signup">
          <span>¡Crea una ahora mismo!</span>
        </a>
      </div>
    </div>
  );
}
