import React from 'react';
import Notification from './Notification/Notification'

//notific hard
import { Notificaciones } from '../../helpers/Notifications';

const Notifications = () => {
    return (
		<>
			{
			Notificaciones.map((not) => { return (
            <Notification
				titulo={not.titulo}
				fecha={not.fecha}
				leido={not.leido}
            />
			);})}
		</>
	);
}

export default Notifications;