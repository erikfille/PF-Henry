import React, { useState } from 'react';
import style from './DashPerfil.module.css'
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa'

const DashPerfil = () => {

	const [ user, setUser ] = useState(true);

	return (
		<div className={`${style.dashboardContaier} sidebar col-9 px-5`}>
			<HeaderDashboard />
			<div className={`${style.userContainer} col-12 p-5 my-5`}>
			<div className="d-flex justify-content-end">
				<Link to="" className={style.linkEdit}>
					Editar perfil
				</Link>
			</div>
			<div className="d-flex justify-content-center">
				{user ? (
					<>
					<div className="col-4">
						<div className={user.image ? style.imgUser : style.circle} style={{backgroundImage:`url(${user.image})`}}>
							{!user.image ? <FaUserAlt
							style={{ width: "80px", height: "80px" }}
							/> : <></>}
						</div>
					</div>
					<div className="col-7">
						<div className={style.nameContainer}>
							<p className={style.name}>
							Proovedor Apellido{/* {user.name} {user.surname} */}
							</p>
						</div>
						<div className={`${style.fColor} d-flex align-items-center gap-2 mb-4`}>
							<h4 className="mb-0">Email:</h4>
							<span>
								n1provider@gmail.com
								{/* {user.email} */}
							</span>
						</div>
						{/* {user.address && ( */}
							<div className={`${style.fColor} d-flex align-items-center gap-2 mb-4`}>
								<h4 className="mb-0">Dirección:</h4>
								<span>
									Buenos Aires, Argentina
									{/* {user.address} */}
								</span>
							</div>
						{/* )} */}
					</div>
					</>
				) : (
					""
				)}
			</div>
			</div>
		</div>
	);
}

export default DashPerfil;