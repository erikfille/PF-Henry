import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useModal, useProduct } from "../../hooks/useStore";

export default function PayPal(props) {
  const [setModalInfo] = useModal((state) => [state.setModalInfo]);

  const [cartProducts, deleteCartContent, updateStock] = useProduct((state) => [
    state.cartProducts,
    state.deleteCartContent,
    state.updateStock,
  ]);

  const onContinue = (arg) => {
    window.location.href = arg;
  };

  let defaultUrl = "http://localHost:3000";

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="d-flex flex-wrap justify-content-center">
      <PayPalScriptProvider
        options={{
          "client-id":
            "AeL7yM8K1K-s4nfOXeKfU3rt4QbKBpiWrqiwqcdwZStk-UOhIDb9qEmBhUSBjTkVn5AmyF2E60PnHzXc",
          currency: "USD",
        }}
      >
        <div className="d-flex justify-content-center w-100">
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: props.totalPrice,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(function (details) {
                setModalInfo(
                  "Compra Exitosa",
                  `${details.payer.name.given_name} tu compra se realizó con éxito, en breve serás redirigido a tu panel de usuario`,
                  onContinue,
                  [`/tienda`]
                );
                updateStock(cartProducts);
                deleteCartContent();

                // OPTIONAL: Call your server to save the transaction
                return fetch(`${defaultUrl}/paypal-transaction-complete`, {
                  method: "post",
                  body: JSON.stringify({
                    orderID: data.orderID,
                  }),
                });
              });
            }}
            onError={(err) => {
              console.error("Error en el pago: ", err);
              setModalInfo(
                "Error en el pago",
                "Ha ocurrido un error en el pago, inténtalo de nuevo más tarde.",
                onContinue,
                ["/checkout"]
              );
            }}
            onCancel={(data) => {
              console.log("Pago cancelado: ", data);
              setModalInfo(
                "Pago cancelado",
                "La compra ha sido cancelada.",
                onContinue,
                ["/checkout"]
              );
            }}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
}
