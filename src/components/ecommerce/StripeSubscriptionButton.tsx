'use client'
// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600

import { LoadingAnim } from "@components/elements/LoadingAnim";
import ErrorMessage from "@components/ErrorMessage";
import {loadStripe} from "@stripe/stripe-js";
import formStyles from '@styles/menus/form.module.scss'
import Link from "next/link";
import { useState } from "react";
import { BsStripe } from "react-icons/bs";

import { envs } from "@/envs";

type Props = {
  id:string,
  addonIds?:String[],
  couponName?:string,
}

export default function StripeSubscriptionButton({id, addonIds, couponName}:Props) {
    const [isPending, setIsPending] = useState(false)
    const [errorObj, setErrorObj] = useState<unknown>()
    const [messageState, setMessageState] = useState<string|undefined>()

    const redirectToCheckout = async () => {
      
      try {
        setIsPending(true)

        if(!envs.STRIPE_PUBLIC_KEY) return console.log('!!! NO STRIPE PUBLIC KEY');
        const stripe = await loadStripe(envs.STRIPE_PUBLIC_KEY as string);
        if (!stripe) throw new Error('Stripe failed to initialize.');

        const response = await fetch('/api/checkout/subscriptionplan', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id,
              addonIds,
              couponName,
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

    if(!envs.STRIPE_PUBLIC_KEY) return <p> <Link href={'/contact'} className="button"> contact us </Link> to set up this subscription </p>

    return <>
      {errorObj && <ErrorMessage error={errorObj} />}

      {messageState && <p className="error"> {messageState} </p>}

      <div className={formStyles.button_coupon} >
        <button
          onClick={() => redirectToCheckout()}
          disabled={isPending}
          className="button large"
          type="button"
        >
          
          {(isPending) ? (
            <LoadingAnim />
          ) : (
            <span> Pay with Stripe <BsStripe style={{marginLeft: '1rem'}}/> </span>
          )}
        </button>

      </div>
    </>
  
}