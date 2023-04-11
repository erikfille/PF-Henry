import React, { useState, useEffect } from "react";
import { useProduct } from "../../hooks/useStore";
import { useBraintree, Dropin } from "react-braintree-dropin";

export default function Braintree(props) {
  const [deleteCartContent] = useProduct((state) => [state.deleteCartContent]);

  const [loading, setLoading] = useState(false);
  const [nonce, setNonce] = useState(null);

  const { createPayment } = useBraintree();

  const handlePayment = async () => {
    const { nonce } = await createPayment({
      amount: "0.01",
      options: {
        submitForSettlement: true,
      },
    });
    setNonce(nonce);
  };

  useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, []);

  const handleSuccess = () => {
    // Handle successful payment
    console.log("Payment succeeded");
    deleteCartContent();
    setTimeout(() => {
      window.location.href = "/"; // Redirigir a la página de inicio
    }, 1000); // Redirigir después de 1 segundo
  };

  const handleError = () => {
    // Handle error during payment
    alert("Error al procesar el pago. Por favor, intenta nuevamente más tarde.");
    console.error("Payment failed");
  };

  const handleCancel = () => {
    // Handle payment cancellation
    alert("El pago ha sido cancelado.");
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Dropin
            options={{
              authorization: 'xvq6pyk5jhjbnt7j',
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (window.dropinInstance = instance)}
          />
          <button onClick={handlePayment}>Pagar con Braintree</button>
        </>
      )}
      {nonce && (
        <form
          method="post"
          action="/braintree/process"
          onSubmit={handleSuccess}
        >
          <input type="hidden" name="nonce" value={nonce} />
          <button type="submit">Completar pago</button>
        </form>
      )}
    </div>
  );
}
