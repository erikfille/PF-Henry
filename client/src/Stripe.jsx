

import React from 'react'
import { loadstripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements}from "@stripe/react-stripe-js"
// import "bootswatch/dist/lux/boostrap.min.css"


const stripePromise = loadstripe("pk_test_51Msa1FEMam3yFaJ2uGkuW0XqUE8AALvUmItl1yR2274d1tJN3nLbrd9ZFear6XujaSndqdzTgFKg40QqM1Zrf9tI00TvgQhRLF")

const CheckoutForm = () => {
    
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmint= async (e)=> {
        
        e.preventDefault()
        
        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElements(CardElement)
        })

    }


    return <form onSubmit={handleSubmint} className="card">
                <CardElement/>
                    <button>
                        Pagar con Stripe
                    </button>
            </form>
    

}


export default function Stripe() {

    return (
        <Elements stripe = {stripePromise}>
            <div className= "container p-4">
                <div className= "row">
                    <div className="col-md-4 offset-md-3">
                         <CheckoutForm/>
                    </div>
                </div>
            </div>
           
        </Elements>
    )

}
