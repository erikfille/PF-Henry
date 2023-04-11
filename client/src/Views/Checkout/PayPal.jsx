import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useProduct } from "../../hooks/useStore";

export default function PayPal(props) {
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
            console.log("Payment succeeded:", details);

            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID,
              }),
            }).then(() => {
              setTimeout(() => {
                window.location.href = "/"; // Redirigir a la página de inicio
              }, 50000); // Mostrar la alerta durante 3 segundos
            }).then(() => {
              // Mostrar mensaje de compra exitosa de PayPal
              alert('Compra exitosa. Serás redirigido al home.');
              deleteCartContent();
              setTimeout(() => {
                window.location.href = "/"; // Redirigir a la página de inicio
              }, 1000); // Redirigir después de 1 segundo
            });
          });
        }}
        onError={(err) => {
          // Manejar el error de PayPal
          alert('Error al procesar el pago. Por favor, intenta nuevamente más tarde.');
          console.error(err);
        }}
        onCancel={() => {
          // Manejar el pago cancelado
          alert('El pago ha sido cancelado.');
        }}
      />
    </PayPalScriptProvider>
  );
}
