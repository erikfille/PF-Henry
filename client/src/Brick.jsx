
import { CardPayment } from '@mercadopago/sdk-react';

import React from 'react'
import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago('APP_USR-5748bc97-54ef-411e-9d38-78d5ebdf76fb');

export default function Brick() {


    const initialization = {
    amount: 100, // monto a ser pago
        payer: {
            email: "",
        },
    }

<<<<<<< HEAD
=======
export default function Brick() {


    const initialization = {
    amount: 100, // monto a ser pago
        payer: {
            email: "",
        },
    }

>>>>>>> 6931ad78fc2a98c364c7f036b427b4ce887f21cb
   
   
   const onSubmit = async (formData) => {
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/pagos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          // recibir el resultado del pago
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          reject();
        });
    });
   };
   
   
   const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
   };
   
   
   const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
    */
   };
   
  return (
    <CardPayment
        initialization={initialization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
    />
  )
}
