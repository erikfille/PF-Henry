import React from 'react';
import style from './ProductProviderCard.module.css';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const ProductProviderCard = (props) => {
	return (
		<div className={`${style.cardProduct}`}>
			<div className="container d-flex align-items-center gap-10">
				<img src={props.imagen} alt="producto" style={{width: "80px"}} className='me-5' />
				<p className='w-50 mb-0 fw-bold'>{props.titulo}</p>
				<p className='mb-0 w-50 fw-bold'>${props.precio}</p>
				<div className="precio d-flex flex-column">
					<p className='mb-0 me-5 fw-bold'>stock</p>
					<p className='mb-0 me-5 fw-bold'>{props.cantidad}</p>
				</div>
				<div className="precio d-flex gap-10">
					<FaEdit className={style.icons} />
					<RiDeleteBin6Line className={style.icons} />
				</div>
			</div>
		</div>
	)
}

export default ProductProviderCard;