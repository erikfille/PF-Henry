import React from 'react'
import { useParams } from 'react-router-dom'
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import style from "./Sidebar/Sidebar.module.css";

export default function ProviderDashboard() {

	const { providerId } = useParams
	
		return (
			<div className="container-xxl">
				<div className="row">
				<div className={`${style.sidebarContainer} sidebar col-3`}>
					<Sidebar />
				</div>
				<Outlet />
				</div>
			</div>
		);
}