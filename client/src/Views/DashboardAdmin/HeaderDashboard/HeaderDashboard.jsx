import React, { useEffect, useState } from 'react';
import DarkMode from '../../../components/DarkMode/DarkMode';
import { FaUserCircle } from 'react-icons/fa'
import style from './HeaderDashboard.module.css';
import { Link } from 'react-router-dom';
import { useLogin } from '../../../hooks/useAuth';



const HeaderDashboard = () => {

	const [logoutUser] = useLogin((state) => [state.logoutUser]);
	const [user, setUser] = useState({});

	const [ userLogged, setUserLogged ] = useState(true);

	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem("user"));
		if (localUser && !user.id) {
			setUserLogged(true);
			setUser(localUser);
		}
	}, [window.location])

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
								<img
									src={user.image}
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
											to={`/perfil/${user.id}`}
											className={`${style.li} dropdown-item`}>
											Ver perfil
										</Link>
									</li>
									<li>
										<Link
											onClick={() => logoutUser()}
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