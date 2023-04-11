import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useModal, useProduct } from "../../hooks/useStore";



export default function PayPal(props) {
  const [setModalInfo] = useModal((state) => [state.setModalInfo]);
  const [deleteCartContent] = useProduct((state) => [state.deleteCartContent]);
 
  return (

    <PayPalScriptProvider
      options={{
        "client-id": "AeL7yM8K1K-s4nfOXeKfU3rt4QbKBpiWrqiwqcdwZStk-UOhIDb9qEmBhUSBjTkVn5AmyF2E60PnHzXc",
        currency: "USD",
      }}
    >
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
                   details.payer.name.given_name + "Tu compra se realizó con éxito, en breve serás redirigido a tu panel de usuario"
                );
              deleteCartContent()

            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID
              })
            }).then(() => {
              setTimeout(() => {
                window.location.href = "/"; // Redirigir a la página de inicio
              }, 3000); // Mostrar la alerta durante 3 segundos
            });
          });
        }}

      />
    </PayPalScriptProvider>

);
}