import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "./Checkout.module.css";
import { useModal, useProduct } from "../../hooks/useStore";


// import React, { useEffect } from "react";
// import MercadoPago from "MercadoPago"


export default function CheckOut({productos, data}) {

  const [totalPrice, setCartRemove, cartProducts] = useProduct((state) => [
    state.totalPrice,
    state.setCartRemove,
    state.cartProducts,
    state.orderId
  ]);

  const [setModal] = useModal((state) => [state.setModal]);

//   useEffect(() => {
// 		const mp = new MercadoPago('TEST-35895483-3aaf-4657-9524-93fc0375cbc7', { locale: 'es' });
// 		const bricksBuilder = mp.bricks();
// 		const renderCardPaymentBrick = async (bricksBuilder) => {
// 		  const settings = {
// 			initialization: {
// 			  amount: totalPrice, // monto a ser pagado
// 			  payer: {
// 				email: "",
// 			  },
// 			},
// 			customization: {
// 			  maxInstallments: 12,
// 			  visual: {
// 				style: {
// 				  theme: 'bootstrap', // | 'dark' | 'bootstrap' | 'flat'
// 				}
// 			  },
// 			},
// 			callbacks: {
// 			  onReady: () => {
// 				// callback llamado cuando Brick esté listo
// 			  },
// 			  onSubmit: (cardFormData) => {
// 				//  callback llamado cuando el usuario haga clic en el botón enviar los datos
// 				//  ejemplo de envío de los datos recolectados por el Brick a su servidor
// 				return new Promise((resolve, reject) => {
// 				  fetch("/pagos", {
// 					method: "POST",
// 					headers: {
// 					  "Content-Type": "application/json",
// 					},
// 					body: JSON.stringify(cardFormData)
// 				  })
// 					.then((response) => {
// 					  // recibir el resultado del pago
// 					  resolve();
// 					})
// 					.catch((error) => {
// 					  // tratar respuesta de error al intentar crear el pago
// 					  reject();
// 					})
// 				});
// 			  },
// 			  onError: (error) => {
// 				// callback llamado para todos los casos de error de Brick
// 			  },
// 			},
// 		  };
// 		  window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
// 		};
// 		renderCardPaymentBrick(bricksBuilder);
// 	  }, [totalPrice]);
  
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
							{/* <div id="cardPaymentBrick_container">
							</div>  */}
		
				</div>
			</div>
		</>
	);
}


