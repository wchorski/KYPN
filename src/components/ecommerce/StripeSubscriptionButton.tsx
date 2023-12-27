'use client'
// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600

import {loadStripe} from "@stripe/stripe-js";
import { useCart } from "@components/hooks/CartStateContext";
import { envs } from "@/envs";
import { BsStripe } from "react-icons/bs";
import { useState } from "react";
import ErrorMessage from "@components/ErrorMessage";
import { LoadingAnim } from "@components/elements/LoadingAnim";
import formStyles from '@styles/menus/form.module.scss'
import Link from "next/link";
import { Addon, AddonCheckboxOptions } from "@ks/types";
import moneyFormatter from "@lib/moneyFormatter";

type Props = {
  id:string,
  addons?:Addon[],
}

export default function StripeSubscriptionButton({id, addons}:Props) {
    const [isPending, setIsPending] = useState(false)
    const [errorObj, setErrorObj] = useState<unknown>()
    const [messageState, setMessageState] = useState<string|undefined>()
    const [couponName, setCouponName] = useState('')
    const addonOptions = addons?.map(ad => ({
      name: ad.name,
      label: ad.name,
      id: ad.id,
      isChecked:false,
      price: ad.price,
    })) as AddonCheckboxOptions[]

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
          className="button large">
          
          {(isPending) ? (
            <LoadingAnim />
          ) : (
            <span> Pay with Stripe <BsStripe style={{marginLeft: '1rem'}}/> </span>
          )}
        </button>

        <div>
          
        <label className={formStyles.coupon}>
          <span> coupon </span>
          <input 
            name="coupon"
            type="text"
            onChange={e => setCouponName(e.target.value)}
          />
        </label>

      {addons && addons.length > 0 && <>

        <h5> Add-Ons</h5>
        {addons?.length === 0 && <p className="subtext"> no addons available </p>}
        <div className={formStyles.addons_wrap} >
          {addonOptions.map(addon => (
              <label 
                key={addon.name}
                htmlFor={addon.name}
                className={'checkbox'}
              >
                <input 
                  name={addon.name}
                  value={addon.id} 
                  type={'checkbox'}
                  readOnly={false}
                  defaultChecked={addon.isChecked}
                  // onChange={(e) => {
                  //   dispatchRed({type: 'ADDON_CHECKBOX', payload: {
                  //     value: e.target.value,
                  //     isChecked: e.target.checked
                  //   }})
                  // }}
                />
                <span> 
                  <strong> {moneyFormatter(addon.price)} </strong>  
                  {addon.name}
                </span>
              </label>
            ))}
        </div>
      </>}
        </div>
      </div>
    </>
  
}