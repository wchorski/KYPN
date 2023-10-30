'use client'
// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600

import {loadStripe} from "@stripe/stripe-js";
import { useCart } from "@components/context/CartStateContext";
import { envs } from "@/envs";
import { BsStripe } from "react-icons/bs";
import { useState } from "react";
import ErrorMessage from "@components/ErrorMessage";
import { LoadingAnim } from "@components/elements/LoadingAnim";

export default function StripeCheckoutButton() {
    const { cartItems } = useCart()
    const [errorObj, setErrorObj] = useState<unknown>()

    const redirectToCheckout = async () => {
        try {
            if(!envs.STRIPE_PUBLIC_KEY) return console.log('!!! NO STRIPE PUBLIC KEY');
            
            const stripe = await loadStripe(envs.STRIPE_PUBLIC_KEY as string);

            if (!stripe) throw new Error('Stripe failed to initialize.');

            const checkoutResponse = await fetch('/api/stripecheckout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({cartItems}),
            });

            const {sessionId} = await checkoutResponse.json();
            

            const stripeError = await stripe.redirectToCheckout({sessionId});

            if (stripeError) {
              console.log('!!! StripeCheckoutButton stripe Error: ');
              console.error(stripeError);
              setErrorObj(stripeError)
            }
        } catch (error) {
          console.log('!!! StripeCheckoutButton Error: ');
          console.error(error);
          setErrorObj(error)
        }
    };

    return <>
      {errorObj && <ErrorMessage error={errorObj}/>}
      <button
        onClick={() => cartItems.length > 0 && redirectToCheckout()}
        disabled={cartItems.length === 0}
        className="button large">
        
        {cartItems.length === 0 ? (
          <LoadingAnim />
        ) : (
          <span> Checkout with Stripe <BsStripe style={{marginLeft: '1rem'}}/> </span>
        )}
      </button>
    </>
  
}