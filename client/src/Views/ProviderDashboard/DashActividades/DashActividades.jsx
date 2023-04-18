import React from 'react';
import style from './DashActividades.module.css';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard'
import Notifications from './Notifications/Notifications';

const DashActividades = () => {
  return (
    <div className={`${style.dashboardContaier} sidebar col-9 px-5`}>
			<HeaderDashboard />
			<div className={`${style.titleContainer} col-12 p-4 my-5`}>
				<div className="">
					<h1 className='mb-0 fw-bold'>Actividades</h1>
				</div>
			</div>
			<div className={`${style.activitiesContainer} col-12 px-5 py-4 my-5`}>
				<Notifications />
			</div>
		</div>
  )
}

export default DashActividades;