
import React from 'react'
import { StatusScreen } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago('YAPP_USR-5748bc97-54ef-411e-9d38-78d5ebdf76fb');


export default function Brick() {

const initialization = {
    paymentId: paymentId, // id de pago para mostrar es el ID que devuelve la API de Pagos al generar un pago con Mercado Pago.
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
   
   const customization = {
    visual: {
        texts: {
          ctaGeneralErrorLabel: 'Custom Label'
        },
    backUrls: {
      error: '<http://<your_domain>/error>',
      return: '<http://<your_domain>/homepage>',
    },
   }   
};


   
  return (
    <StatusScreen
        initialization={initialization}
        onReady={onReady}
        onError={onError}
        customization= {customization}
    />
  )
}
