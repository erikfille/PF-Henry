import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { BiMenu } from "react-icons/bi";
// styles
import styles from "./Header.module.css";

const Header = () => {
	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary navbar-light bg-light'>
			<div className='container-fluid bg-light'>
				<div className={`d-flex align-items-center ${styles.logoContainer}`}>
					<h3>PetsAmerica</h3>
					<img src={Logo} alt='Logo' className={`align-text-top ms-2 ${styles.logo}`} />
				</div>
				<BiMenu
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
					className={styles.menuButton}
				/>
				<div className='collapse navbar-collapse justify-content-end me-4 ' id='navbarNav'>
					<div className='navbar-nav'>
						<NavLink to='/inicio' className='nav-item me-4'>
							Inicio
						</NavLink>
						<NavLink to='/about' className='nav-item me-4'>
							Sobre Nosotros
						</NavLink>
						<NavLink to='/tienda' className='nav-item me-4'>
							Tienda
						</NavLink>
						<NavLink to='/servicios' className='nav-item me-4'>
							Servicios
						</NavLink>
						<NavLink to='/contacto' className='nav-item me-4'>
							Contacto
						</NavLink>
						<NavLink to='/faqs' className='nav-item me-4'>
							Faqs
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
