import React, { useState } from 'react';
import DarkMode from '../../../components/DarkMode/DarkMode';
import { FaUserCircle } from 'react-icons/fa'
import style from './HeaderDashboard.module.css';
import { Link } from 'react-router-dom';



const HeaderDashboard = () => {

	const [ userLogged, setUserLogged ] = useState(true);

	return (
		<div className="header d-flex mt-5 align-items-center justify-content-between">
			<h1 className={`${style.h1} fw-bold mb-0`}>Dashboard Administrador</h1>
			<div className="div">
				<div className="circleUse d-flex align-items-center gap-30">
					<div className="dropdown">
						<span
							className={`${style.buttonCart} dropdown-toggle`}
							role="button"
							data-bs-toggle="dropdown">
							{userLogged ? (
								// traer la imagen del admin logeado y mostrarla en el src.
								<img
									// src={user.image}
									alt="user-pic"
									className={`rounded-circle me-1 ${style.imgProfile}`}
								/>
							) : (
								<FaUserCircle className={style.iconProfle} />
							)}
						</span>
						{!userLogged ? (
							<>
								<ul
									className={`${style.bgColor} dropdown-menu`}
									aria-labelledby="dropdownMenuLink">
									<li>
										<Link to="/" className={`${style.li} dropdown-item`}>
											Ir a la App
										</Link>
									</li>
									<li>
										<Link to="/login" className={`${style.li} dropdown-item`}>
											Iniciar Sesión
										</Link>
									</li>
									<li>
										<Link to="/signup" className={`${style.li} dropdown-item`}>
											Registrarte
										</Link>
									</li>
								</ul>
							</>
						) : (
							<>
								<ul
									className={`${style.dropDownMenu} dropdown-menu`}
									aria-labelledby="dropdownMenuLink">
									<li>
										<Link to="/" className={`${style.li} dropdown-item`}>
											Ir a la App
										</Link>
									</li>
									<li>
										<Link
											// to={`/perfil/${user.id}`} // sacar el ID del admin logeado.
											className={`${style.li} dropdown-item`}>
											Ver perfil
										</Link>
									</li>
									<li>
										<Link
											className={`${style.li} dropdown-item`}>
											Cerrar sesión
										</Link>
									</li>
								</ul>
							</>
						)}
					</div>
					<DarkMode />
				</div>
			</div>
		</div>
	)
}

export default HeaderDashboard;