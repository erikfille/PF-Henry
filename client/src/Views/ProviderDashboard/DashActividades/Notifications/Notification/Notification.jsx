import React, { useState } from 'react';
import style from './Notification.module.css';

const Notification = (props) => {

    return (
        <div className={`${style.notifContainer} d-flex justify-content-center align-items-center gap-80 py-2`}>
            <div className={`${style.status} ${props.leido ? style.inactive : style.active} ms-4 mt-2`}>
            </div>
            <p className='mb-0 fw-bold'>{props.fecha}</p>
            <p className='mb-0 fw-bold'>{props.titulo}</p>
            <button className='button'>Ver compra</button>
        </div>
    )
}

export default Notification;