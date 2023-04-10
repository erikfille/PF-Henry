import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useModal, useProduct } from "../../hooks/useStore";

import axios from "axios";

export default function PayPal(props) {
	const [setModalInfo] = useModal((state) => [state.setModalInfo]);

	const [deleteCartContent] = useProduct((state) => [state.deleteCartContent]);

	async function onApproveAction(data) {
		let response = await axios.post("/paypal-transaction-complete", {
			orderID: data.orderID,
		});
		console.log(response);
		deleteCartContent();
		window.location.assign("/");
	}

	return (
		<PayPalScriptProvider
			options={{
				"client-id":
					"AeL7yM8K1K-s4nfOXeKfU3rt4QbKBpiWrqiwqcdwZStk-UOhIDb9qEmBhUSBjTkVn5AmyF2E60PnHzXc",
				currency: "USD",
			}}>
			<PayPalButtons
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: "0.01",
								},
							},
						],
					});
				}}
				onApprove={(data, actions) => {
					return actions.order.capture().then(function (details) {
						setModalInfo(
							"Compra Exitosa",
							`${details.payer.name.given_name} tu compra se realizó con éxito, en breve serás redirijido a tu panel de usuario`,
							onApproveAction,
							[data]
						);
						// OPTIONAL: Call your server to save the transaction
						// return fetch("/paypal-transaction-complete", {
						//   method: "post",
						//   body: JSON.stringify({
						//     orderID: data.orderID,
						//   }),
						// }).then(() => {
						//   setTimeout(() => {
						//     window.location.href = "/"; // Redirigir a la página de inicio
						//   }, 10000); // Mostrar la alerta durante 3 segundos
						// });
					});
				}}
			/>
		</PayPalScriptProvider>
	);
}
