'use client'
// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600

import {loadStripe} from "@stripe/stripe-js";
import { useCart } from "@hooks/CartStateContext";
import { envs } from "@/envs";
import { BsStripe } from "react-icons/bs";
import { useState } from "react";
import ErrorMessage from "@components/ErrorMessage";
import { LoadingAnim } from "@components/elements/LoadingAnim";
import { CartItem, Rental } from "@ks/types";
import { checkProductRentalAvail } from "@lib/checkProductRentalAvail";
import styles from '@styles/elements/button.module.css'
import { Button } from "@components/elements/Button";

type Props = {
  cartItems: CartItem[],
  rental?: {
    hours:number,
    start:string,
    end:string,
    location:string,
    delivery:boolean,
  },
  currentRentals: Rental[],
}

export default function StripeCheckoutButton({cartItems, rental, currentRentals}:Props) {
    // const { cartItems } = useCart()
    const [isPending, setIsPending] = useState(false)
    const [errorObj, setErrorObj] = useState<unknown>()
    const [messageState, setMessageState] = useState<string|undefined>()

    const redirectToCheckout = async () => {
      
      try {
        setIsPending(true)
        setErrorObj(undefined)
        
        if(rental){
          const { isRentalConflict, message } = checkProductRentalAvail({
            rentalRange: {start: rental.start, end: rental.end}, 
            rentals: currentRentals, 
            rentalItems: cartItems.filter(item => item.type === 'RENTAL')
          })
          
          if(isRentalConflict) throw Error(message)
        }

        if(!envs.STRIPE_PUBLIC_KEY) return console.log('!!! NO STRIPE PUBLIC KEY');
        const stripe = await loadStripe(envs.STRIPE_PUBLIC_KEY as string);
        if (!stripe) throw new Error('Stripe failed to initialize.');

        const response = await fetch('/api/checkout/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cartItems, 
              rental,
            }),
        });

        const data = await response.json();
        
        const { sessionId, message , isStockAvailable } = data

        if(!isStockAvailable) return setMessageState(message)

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

      } finally {
        setIsPending(false)
      }
    };

    if(!envs.STRIPE_PUBLIC_KEY) return null

    return <>
      {errorObj && <ErrorMessage error={errorObj}/>}
      {messageState && <p className="error"> {messageState} </p>}
      {/* <button
        type="button"
        onClick={() => cartItems.length > 0 && redirectToCheckout()}
        disabled={isPending || cartItems.length === 0}
        className="button large">
        
        {(isPending || cartItems.length === 0) ? (
          <LoadingAnim />
        ) : (
          <span> Checkout with Stripe <BsStripe /> </span>
        )}
      </button> */}

      <Button 
        type={'button'}
        size={'large'}
        onClick={() => cartItems.length > 0 && redirectToCheckout()}
        disabled={isPending || cartItems.length === 0}
      >
        Checkout with Stripe <BsStripe />
      </Button>
    </>
  
}