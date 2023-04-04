
import React from "react"
import { PayPalButton } from "react-paypal-button-v2";

export default function PayPal({totalPrice}) {


    return (
      <div>
        <PayPalButton
          options = {{
          clientId: "AUqQqTlFaiedAwEQ_6DYD0VtDWyl5wOgl8vMl3LRxLIbzxOr2vdGllhX1nVfxuNvOphwC9hEP_C0cKGP",
          currency: "USD"
          }}
        
          amount={totalPrice}
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        
          onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
          console.log({details, data});

          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
        }}
      />
      </div>
      
    );
  }
