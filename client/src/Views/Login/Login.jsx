import React from "react";
import LoginWidget from "../../components/LoginWidget/LoginWidget";
import {useLocation} from 'react-router-dom';

import styles from "./Login.module.css";

export default function Login() {

  const location = useLocation()

  const actualLocation = location.pathname


  let childProps = {}

  if(location.pathname === "/login") {
    childProps = {
      type: "login",
      subtitle: "Ingrese sus datos para acceder",
      button: "Ingresar",
      message: "¿No tienes cuenta?",
      accountAnchor: "¡Crea una cuenta ahora mismo!",
      anchorPath: "/signup"
    }
  }

  if(location.pathname === "/signup") {
    childProps = {
      type: "signup",
      subtitle: "Ingrese sus datos para registrarse",
      button: "Registrate",
      message: "¿Ya tienes cuenta?",
      accountAnchor: "Ir al Login",
      anchorPath: "/login"
    }
  }

  return (
    <div className="LoginContainer">
      <LoginWidget childProps={childProps} />
    </div>
  );
}
