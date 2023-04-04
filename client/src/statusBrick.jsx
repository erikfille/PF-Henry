import React from 'react'
import { StatusScreen } from '@mercadopago/sdk-react';

export default function statusBrick() { 

const initialization = {
    paymentId: '<PAYMENT_ID>', // id de pago para mostrar
    //El paymentId que se debe enviar a Brick para su inicialización es el ID que devuelve la API de Pagos al generar un pago con Mercado Pago.
   };
   const onError = async (error) => {
    // callback llamado solicitada para todos los casos de error de Brick
    console.log(error);
   };
   const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
   };
   
  return (
    <StatusScreen
    initialization={initialization}
    onReady={onReady}
    onError={onError}
 />
  )
}
