import { gql, useMutation } from "@apollo/client"
import ErrorMessage from "../ErrorMessage"
import { FormEvent, useState } from "react"
import { useUser } from "../menus/Session"
import Link from "next/link"
import { LoadingAnim } from "../elements/LoadingAnim"
import nProgress from "nprogress"
import { AddressElement, CardElement, Elements, ExpressCheckoutElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import styled from "styled-components"

type Props = {
  planId:string
}

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY || 'NO_FRONTEND_STRIPE_KEY_IN_ENV'
const stripeLib = loadStripe(STRIPE_KEY)

let formState:'success'|'failure'|undefined = undefined

export function CheckoutFormChild({planId}:Props) {

  const session = useUser()
  const stripe = useStripe()
  const elements = useElements()
  const [errorStripe, setError] = useState()

  const [mutateCheckout, { error, loading, data }] = useMutation(CHECKOUT_SUBSCRIPTIONITEM, {
    // refetchQueries: [{ query: QUERY_USER_CURRENT }]
  })
  // const [createSubscriptionItem, { data, error, loading }] = useMutation(CREATE_SUBSCRIPTIONITEM)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      const formattedInputs = {
        custom_price: 0,
        isActive: true,
        isDelinquent: false,
      }
  
      if (planId !== '' ) {
        Object.assign(formattedInputs, {
          subscriptionPlan: {
            connect: {
              id: planId
            }
          },
        })
      }
  
      if (session) {
        Object.assign(formattedInputs, {
          user: {
            connect: {
              id: session.id
            }
          }
        })
      }
      
      // @ts-ignore
      const { paymentMethod, error } = await stripe?.createPaymentMethod({
        // @ts-ignore
        elements,
        params: {
          billing_details: {
            name: session ? session.name : 'Anonymous Name',
            email: session ? session.email : 'Anonymous Email',
          },
        },
      });
      
  
      if (error) {
        console.log(error);
        nProgress.done()
        setError(error)
        return //stops checkout
      }

      const res = await mutateCheckout({
        variables: {
          userId: session?.id,
          custom_price: 3333,
          planId: planId,
          token: paymentMethod.id,
        }
      })
      console.log('FINISHED ORDER', res);
      nProgress.done()
  
      // const res = await createSubscriptionItem({
      //   variables: {
      //     data: formattedInputs
      //   }
      // })
      // console.log(res);
      // res.data.createSubscriptionItem ? formState = 'success' : formState = 'failure'
      
    } catch (error) {
      console.log('SubscriptionItem Create Error: ', error);
      
    }


    
  }

  return (<>

    {!formState && (
      <StyledCheckoutForm onSubmit={handleSubmit}>
        <ErrorMessage error={error || errorStripe} />

        <CardElement />
        <button type="submit" disabled={loading}> checkout Subscribe </button>

      </StyledCheckoutForm>
    )}

    {formState === 'success' && (<>
      <p> subscription successful </p>
      <Link href={`/myaccount`}> My Account </Link>
    </>)}

    {loading && (
      <LoadingAnim />
    )}

  </>)
}


export function SubscriptionItemForm({planId}:Props) {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormChild planId={planId} />
    </Elements>
  )
}

const StyledCheckoutForm = styled.form`
  box-shadow: 0 1px 2px 2px black;
  background-color: azure;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;

  max-width: 30em;

`

const CHECKOUT_SUBSCRIPTIONITEM = gql`
  mutation CheckoutSubscription(
    $custom_price: Int!, 
    $token: String!, 
    $planId: String!,
    $userId: String!,
  ) {
  checkoutSubscription(
    token: $token, 
    planId: $planId,
    userId: $userId,
    custom_price: $custom_price,
  ) {
    id
    user {
      email
      id
    }
  }
}
`

const CREATE_SUBSCRIPTIONITEM = gql`
  mutation CreateSubscriptionItem($data: SubscriptionItemCreateInput!) {
  createSubscriptionItem(data: $data) {
    user {
      id
    }
    custom_price
    id
    isActive
    isDelinquent
    subscriptionPlan {
      id
      name
    }
  }
}
`