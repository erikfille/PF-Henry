import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "./Checkout.module.css";
import { useModal, useProduct } from "../../hooks/useStore";

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FORM_ID = 'payment-form';


export default function CheckOut({ ordenId }) {

  const [totalPrice, setCartRemove, cartProducts, orderId] = useProduct((state) => [
    state.totalPrice,
    state.setCartRemove,
    state.cartProducts,
    state.orderId
  ]);

  const [setModal] = useModal((state) => [state.setModal]);

  // PASARELA DE PAGOS:
  // No esta renderizando el script pero creo que es un problema de que necesito bien el nombre del preference Id
  // cree un orden id en el cart porque se necesita, pero genera un bug cuando haces click en confirmar pedido, no se cierra el modal, no se si es un bug mio xq me renderiza productos que ni tengo en el carrito

  const [preferenceId, setPreferenceId] = useState(null); //!Necesita el preference Id que le da el back

  const func = async () => {
    const { data } = await axios.post(`https//:localhost:3000/pago/${ordenId}`);
    setPreferenceId(data.payment_id);
  }

  useEffect(() => {
    if (!preferenceId?.length) func()
  }, [orderId, preferenceId?.length]);

  useEffect(() => {
	if (preferenceId) {
		// con el preferenceId en mano, inyectamos el script de mercadoPago
	  const script = document.createElement('script');
	  script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
	  script.setAttribute("data-preference-id", preferenceId);
	  script.async = true;
	  const form = document.getElementById(FORM_ID);
	  form.appendChild(script);
	}
  }, [preferenceId]);
  
	return (
		<>
			<Meta title={"Completar Orden"} />
			<BreadCrump title="Completar Orden" />
			<div className="home-wrapper-2">
				<div className="container-xl mt-5 bg-white">
					<div className="row px-3 pt-3">
						<h1 className="fw-bold">Confirma tu pedido</h1>
						<hr />
						{cartProducts.length && typeof cartProducts == "object" ? (
							<div className="table-responsive-xl">
								<table className="table table-hover align-middle table-borderless">
									<thead>
										<tr>
											<th scope="col" className="align-middle text-center fs-5">
												Imagen
											</th>
											<th scope="col" className="align-middle text-center fs-5">
												Producto
											</th>
											<th scope="col" className="align-middle text-center fs-5">
												Precio
											</th>
											<th scope="col" className="align-middle text-center fs-5">
												Cantidad
											</th>
											<th scope="col" className="align-middle text-center fs-5">
												Subtotal
											</th>
											<th
												scope="col"
												className="align-middle text-center  fs-5"
												width="5"></th>
										</tr>
									</thead>
									<tbody>
										{cartProducts.map((p) => (
											<tr key={p._id}>
												<td
													colspan="1"
													width="150"
													height="70"
													className="align-middle text-center">
													<img
														className="img-fluid w-25"
														width="40"
														src={p.imagen}
														alt="logo-producto"
													/>
												</td>
												<td className="align-middle text-center fw-bold">{p.titulo}</td>
												<td className="align-middle text-center fw-bold">$ {p.precio}</td>
												<td className="align-middle text-center fw-bold">{p.quantity}</td>
												<td className="align-middle text-center fw-bold">
													{(p.quantity * p.precio).toFixed(2)}
												</td>
												<td className={`align-middle text-center ${styles.buttonDelete}`}>
													<RiDeleteBin6Line
														className="ms-5"
														onClick={() =>
															setModal(
																"Eliminar Producto",
																"¿Deseas eliminar este producto?",
																setCartRemove,
																[p._id]
															)
														}
													/>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<p className="m-3 w-100 text-center">No hay productos en el carrito</p>
						)}
						<div>
							<h1 className="fw-bold text-end m-3">Total $ {totalPrice}</h1>
						</div>
							
							</div>

							<div>
        						<form id={FORM_ID} method="GET">
        						</form>
    						</div>
		
				</div>
			</div>
		</>
	);
}

//----------->Otras pruebas 

//? Checkout pro de MP
//!No redirige al standbox -esta roto desde mp- 
// import { useState } from "react";
// import axios from "axios";
// import Comprar from "../Comprar"


	// const [datos, setDatos] = useState("")
  
	// useEffect(()=>{
	//   axios
	//   .get(`http://localhost:3001/mercadopago`)
	//   .then((data)=>{
	// 	setDatos(data.data)
	// 	console.info('Contenido de data:', data)
	//   }).catch(err => console.error(err)) 
	// },[])


	//  <div>
	// 	<Comprar data={datos}/>
	// </div>  


//? Checkout Bricks de Mp
//! da problema con el process env


//import MercadoPago from 'mercadopago';
 
	// useEffect(() => {
	// 	const mp = new MercadoPago('TEST-35895483-3aaf-4657-9524-93fc0375cbc7', { locale: 'es' });
	// 	const bricksBuilder = mp.bricks();
	// 	const renderCardPaymentBrick = async (bricksBuilder) => {
	// 	  const settings = {
	// 		initialization: {
	// 		  amount: totalPrice, // monto a ser pagado
	// 		  payer: {
	// 			email: "",
	// 		  },
	// 		},
	// 		customization: {
	// 		  maxInstallments: 12,
	// 		  visual: {
	// 			style: {
	// 			  theme: 'bootstrap', // | 'dark' | 'bootstrap' | 'flat'
	// 			}
	// 		  },
	// 		},
	// 		callbacks: {
	// 		  onReady: () => {
	// 			// callback llamado cuando Brick esté listo
	// 		  },
	// 		  onSubmit: (cardFormData) => {
	// 			//  callback llamado cuando el usuario haga clic en el botón enviar los datos
	// 			//  ejemplo de envío de los datos recolectados por el Brick a su servidor
	// 			return new Promise((resolve, reject) => {
	// 			  fetch("/process_payment", {
	// 				method: "POST",
	// 				headers: {
	// 				  "Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify(cardFormData)
	// 			  })
	// 				.then((response) => {
	// 				  // recibir el resultado del pago
	// 				  resolve();
	// 				})
	// 				.catch((error) => {
	// 				  // tratar respuesta de error al intentar crear el pago
	// 				  reject();
	// 				})
	// 			});
	// 		  },
	// 		  onError: (error) => {
	// 			// callback llamado para todos los casos de error de Brick
	// 		  },
	// 		},
	// 	  };
	// 	  window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
	// 	};
	// 	renderCardPaymentBrick(bricksBuilder);
	//   }, [totalPrice]);


	//  <div id="cardPaymentBrick_container">
	//  </div> 
	

//? SDK V2 MP
//! tAMPOCO REDIRIGE
// import { useMercadopago } from 'react-sdk-mercadopago';

// const mercadopago = useMercadopago.v2('TEST-35895483-3aaf-4657-9524-93fc0375cbc7', {
    //     locale: 'en-US'
    // });

    // useEffect(() => {
    //     if (mercadopago) {
    //         mercadopago.checkout({
    //             preference: {
    //                 id: 'global.id'
    //             },
    //             render: {
    //                 container: '.cho-container',
    //                 label: 'Pay',
    //             }
    //         })
    //     }
    // }, [mercadopago])


// <div>
//    <div class="cho-container" />
// </div> 


//? Paypal: 	
//! Me rompe todo no renderiza nada
// import React from "react";
// import ReactDOM from "react-dom"
// import { PayPalButtons } from "@paypal/sdk-react";

// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });


	// const createOrder = (data, actions) => {
	// 	// Order is created on the server and the order id is returned
	// 	return fetch("/my-server/create-paypal-order", {
	// 	  method: "POST",
	// 	   headers: {
	// 		"Content-Type": "application/json",
	// 	  },
	// 	  // use the "body" param to optionally pass additional order information
	// 	  // like product skus and quantities
	// 	  body: JSON.stringify({
	// 		cart: [
	// 		  {
	// 			sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
	// 			quantity: "YOUR_PRODUCT_QUANTITY",
	// 		  },
	// 		],
	// 	  }),
	// 	})
	// 	.then((response) => response.json())
	// 	.then((order) => order.id);
	//   };
	//   const onApprove = (data, actions) => {
	// 	 // Order is captured on the server and the response is returned to the browser
	// 	 return fetch("/my-server/capture-paypal-order", {
	// 	  method: "POST",
	// 	   headers: {
	// 		"Content-Type": "application/json",
	// 	  },
	// 	  body: JSON.stringify({
	// 		orderID: data.orderID
	// 	  })
	// 	})
	// 	.then((response) => response.json());
	//   };


// 	 <PayPalButtons
//  	createOrder={(data, actions) => createOrder(data, actions)}
//   	onApprove={(data, actions) => onApprove(data, actions)}
// 	/> *
