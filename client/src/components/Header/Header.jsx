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
  const [isAdmin, setIsAdmin] = useState(true); // estado hardc para mostrar el link al dashb
  const [setActiveCart, cartProducts] = useProduct((state) => [
    state.setActiveCart,
    state.cartProducts,
  ]);
  const [logoutUser] = useLogin((state) => [state.logoutUser]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser && !user.id) {
      setUserLogged(true);
      setUser(localUser);
    }
  }, [window.location]);

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <div
          className={`d-flex align-items-center ms-3 gap-3 ${styles.logoContainer}`}
        >
          <NavLink to="/" className={styles.navlink}>
            PetsAmerica
          </NavLink>
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
        <div
          className={`${styles.navContainer} collapse navbar-collapse justify-content-end me-4`}
          id="navbarNav"
        >
          <div
            className="navbar-nav align-items-center"
            style={{
              backgroundColor: "transparent",
              width: "100vw !important",
            }}
          >
            <NavLink to="/tienda" className="nav-item me-3">
              Tienda
            </NavLink>
            <NavLink to="/servicios" className="nav-item me-3">
              Servicios
            </NavLink>
            <div
              className={`d-flex flex-column flex-md-row align-items-center justify-content-center ${styles.buttonContainer}`}
            >
              <div className="dropdown">
                <span
                  className={`${styles.buttonCart} dropdown-toggle`}
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {userLogged ? (
                    <div style={{backgroundImage: `url(${user.image})`}} className={`rounded-circle me-1 ${styles.imgProfile}`}></div>
                  ) : (
                    <HiOutlineUserCircle className={styles.buttonUser} />
                  )}
                </span>
                {!userLogged  ? (
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
                      { user.rol !== 'admin' && 
                        <li>
                          <Link
                          to={`/perfil/${user.id}`}
                          className={`${styles.li} dropdown-item`}
                          >
                            Ver perfil
                          </Link>
                          </li>
                      }
                      { user.rol === 'admin' &&
                        <li>
                          <Link
                            to="/adminDashboard/users"
                            className={`${styles.li} dropdown-item`}
                          >
                            Dashboard Admin
                          </Link>
                        </li>
                      }
                      {/* {
                        <li>
                          <Link
                            to="/providerDashboard/profile"
                            className={`${styles.li} dropdown-item`}
                          >
                            Dashboard Proveedor
                          </Link>
                        </li>
                      } */}
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
                <div className="position-relative">
                  <MdOutlineShoppingCart className={styles.iconCart} />
                  {cartProducts.length ? (
                    <div className={styles.totalCart}>
                      {cartProducts.length}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
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
