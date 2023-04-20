import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useModal, useProduct, useUser } from "../../hooks/useStore";

export default function PayPal(props) {
  const [setModalInfo] = useModal((state) => [state.setModalInfo]);
  const [setCompras, userInfo] = useUser((state) => [state.setCompras, state.userInfo]);

  const [cartProducts, deleteCartContent, updateStock] = useProduct((state) => [
    state.cartProducts,
    state.deleteCartContent,
    state.updateStock,
  ]);

  const user = JSON.parse(localStorage.getItem("user"));

  const onContinue = (arg) => {
    window.location.href = arg;
  };

  let defaultUrl = "http://localHost:3000";

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
                updateStock(cartProducts);
                setCompras(cartProducts, userInfo._id)
                deleteCartContent();
                setModalInfo(
                  "Compra Exitosa",
                  `${user.name} tu compra se realizó con éxito, haz click en continuar para ser redirigido a tu panel de usuario`,
                  onContinue,
                  [`/perfil/${user.id}`]
                );

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
