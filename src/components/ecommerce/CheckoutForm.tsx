'use client'
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe, } from "@stripe/stripe-js"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import ErrorMessage from "../ErrorMessage"
import { useSession } from "next-auth/react"
import styles from '@styles/ecommerce/checkoutform.module.scss'
import { useCart } from "@components/context/CartStateContext"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { envs } from "@/envs"

// TODO Add blocker stops stripe.com requests thinks it's X site
const stripeLib = loadStripe(envs.STRIPE_PUBLIC_KEY as string)

function CheckoutFormChild() {

  const {data: session, status} = useSession()

  const router = useRouter()
  const { closeCart } = useCart()
  const [errorStripe, setError] = useState<any>()
  const [errorBackend, setErrorBackend] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  // const [mutateCheckout, { error, loading, data }] = useMutation(MUTATE_CHECKOUT_ORDER, {
  //   // refetchQueries: [{ query: QUERY_USER_CURRENT }]
  // })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    
    // try {
      // @ts-ignore
      const { paymentMethod, error } = await stripe?.createPaymentMethod({
        // @ts-ignore
        elements,
        params: {
          billing_details: {
            name: session ? session.user.name : 'Anonymous Name',
            email: session ? session.user.email : 'Anonymous Email',
          },
        },
      });

      console.log('%%% CHECKOUT %%%');
      console.log(paymentMethod);
      
  
      if (error) {
        console.warn(error)
        setIsLoading(false)
        setError(error)
        return //stops checkout
      }
  
    //   // const res = await mutateCheckout({
    //   //   variables: {
    //   //     token: paymentMethod.id,
    //   //   }
    //   // })
    //   // console.log('FINISHED ORDER', res);
    //   const variables = {
    //     token: paymentMethod.id
    //   }
    //   const res = await fetch('/api/gql/protected', {
    //     method: 'POST',
    //     body: JSON.stringify({query, variables})
    //   })

    //   const data = await res.json()
    //   console.log({data});
    //   if(data.error) setErrorBackend(errorBackend)
  
      setIsLoading(false)
      console.log('check end')
  
      // todo orders page
      // router.push(`/shop/orders/${res.data.checkout.id}`)
      
    // } catch (err) {
    //   console.warn(error)
    //   setIsLoading(false)
    //   nProgress.done()
    //   setError(err)
    // } 

  }

  return (
    <form className={styles.checkout}  onSubmit={e => handleSubmit(e)}>

      {(errorStripe || errorBackend) && (<>
        <ErrorMessage error={errorStripe || errorBackend} />
      </>)}

      <CardElement />

      <button 
        className={[styles.submit, 'button'].join(' ')} 
        disabled={isLoading}
        type={'submit'}
      >
        {isLoading ? <LoadingAnim /> : 'Checkout'}
      </button>

    </form>
  )
}

export function CheckoutForm() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormChild />
    </Elements>
  )
}

const query = `
  mutation Checkout($token: String!) {
    checkout(token: $token) {
      id
    }
  }
`