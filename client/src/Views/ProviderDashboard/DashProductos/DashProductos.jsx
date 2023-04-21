import React from 'react';
import style from './DashProductos.module.css';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import ProductsContainer from './ProductsContainer/ProductsContainer';


const DashProductos = () => {
	return (
		<div className={`${style.dashboardContaier} sidebar col-9 px-5`}>
			<HeaderDashboard />
			<div className={`${style.titleContainer} col-12 p-4 my-5`}>
				<div className="d-flex justify-content-between">
					<h1 className='mb-0 fw-bold'>Mis Productos</h1>
					<button className='button'>Agregar Producto</button>
				</div>
			</div>
			<div className={`${style.productsContainer} col-12`}>
				<ProductsContainer />
			</div>
		</div>
	)
}

export default DashProductos;