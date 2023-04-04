import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useProduct } from "../../hooks/useStore";
import { useLogin } from "../../hooks/useAuth";
import Logo from "../../assets/logo.png";
import { BiMenu } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
// styles
import styles from "./Header.module.css";
import DarkMode from "../DarkMode/DarkMode";

const Header = () => {
  const [userLogged, setUserLogged] = useState(false); // estado hardcodeado solo para trabajar lo que muestra el boton de User.
  const [setActiveCart] = useProduct((state) => [state.setActiveCart]);
  const [logoutUser] = useLogin((state) => [state.logoutUser]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    console.log(localUser);
    if (localUser && !user.id) {
      setUserLogged(true);
      setUser(localUser);
    }
  }, [userLogged]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className={`d-flex align-items-center ms-3 gap-3 ${styles.logoContainer}`}>
          <NavLink to="/" className={styles.navlink}>PetsAmerica</NavLink>
          <img
            src={Logo}
            alt="Logo"
            className={`align-text-top ms-2 ${styles.logo}`}
          />
        </div>
        <BiMenu
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className={styles.menuButton}
        />
        <div className={`${styles.navContainer} collapse navbar-collapse justify-content-end me-4`} id="navbarNav">
          <div className="navbar-nav align-items-center">
            <NavLink to="/" className="nav-item me-3">
              Inicio
            </NavLink>
            <NavLink to="/tienda" className="nav-item me-3">
              Tienda
            </NavLink>
            <NavLink to="/servicios" className="nav-item me-3">
              Servicios
            </NavLink>
            <NavLink to="/contacto" className="nav-item me-3">
              Contacto
            </NavLink>
            <NavLink to="/faqs" className="nav-item me-3">
              Faqs
            </NavLink>
            <NavLink to="/about" className="nav-item me-3">
              Sobre Nosotros
            </NavLink>
            <div className={`d-flex flex-column flex-lg-row align-items-center justify-content-center ${styles.buttonContainer}`}>
              <div className="dropdown">
                <span
                  className={`${styles.buttonCart} dropdown-toggle`}
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <HiOutlineUserCircle className={styles.buttonUser} />
                </span>
                {!userLogged ? (
                  <>
                    <ul
                      className={`${styles.bgColor} dropdown-menu dropdown-menu-end`}
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <Link
                          to="/login"
                          className={`${styles.li} dropdown-item`}
                        >
                          Iniciar Sesión
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/signup"
                          className={`${styles.li} dropdown-item`}
                        >
                          Registrarte
                        </Link>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul
                      className={`${styles.dropDownMenu} dropdown-menu dropdown-menu-end`}
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <Link
                          to={`/perfil/${user.email}`}
                          className={`${styles.li} dropdown-item`}
                        >
                          Ver perfil
                        </Link>
                      </li>
                      <li>
                        <Link
                          to=""
                          onClick={() => logoutUser()}
                          className={`${styles.li} dropdown-item`}
                        >
                          Cerrar sesión
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
              </div>
              <NavLink
                className="nav-item me-3"
                id="cartButton"
                onClick={() => setActiveCart()}
              >
                <MdOutlineShoppingCart className={styles.iconCart} />
              </NavLink>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
