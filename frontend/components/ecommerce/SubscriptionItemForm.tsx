import { gql, useMutation } from "@apollo/client"
import ErrorMessage from "../ErrorMessage"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { QUERY_USER_CURRENT, useUser } from "../menus/Session"
import Link from "next/link"
import { LoadingAnim } from "../elements/LoadingAnim"
import nProgress from "nprogress"
import { AddressElement, CardElement, Elements, ExpressCheckoutElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import styled from "styled-components"
import { Callout } from "../blocks/Callout"
import { SubscriptionItem } from "../../lib/types"

type Props = {
  planId:string
  setFormState: Dispatch<SetStateAction<"success" | "failure" | undefined>>,
}

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY || 'NO_FRONTEND_STRIPE_KEY_IN_ENV'
const stripeLib = loadStripe(STRIPE_KEY)

function CheckoutFormChild({planId, setFormState}:Props) {

  const session = useUser()
  const stripe = useStripe()
  const elements = useElements()
  const [errorStripe, setError] = useState()
  const [isOtherPayment, setIsOtherPayment] = useState(false)

  const [mutateCheckout, { error, loading, data }] = useMutation(CHECKOUT_SUBSCRIPTIONITEM, {
    refetchQueries: [{ query: QUERY_USER_CURRENT }]
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
      // console.log('FINISHED ORDER', res);
      res.data.checkoutSubscription ? setFormState('success') : setFormState('failure')
      nProgress.done()
      
    } catch (error) {
      console.log('SubscriptionItem Create Error: ', error);
    }


    
  }

  return (<>

    <StyledCheckoutForm onSubmit={handleSubmit}>

      <CardElement />

      <div className="buttons-cont">
        <button type="submit" disabled={loading}> Start Subscription </button>
      </div>

    </StyledCheckoutForm>

    <ErrorMessage error={error || errorStripe} />

    {loading && (
      <LoadingAnim />
    )}

  </>)
}


export function SubscriptionItemFormStripe({planId, setFormState}:Props) {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormChild planId={planId} setFormState={setFormState}/>
    </Elements>
  )
}

export function SubscriptionItemForm({planId, setFormState}:Props) {

  const session = useUser()  
  const userPlanIdsOwned = session?.subscriptions?.flatMap((item:SubscriptionItem) => item.subscriptionPlan?.id)
  const userPlanIdsOwnedCount = userPlanIdsOwned?.reduce((count:number, currentString:string) => { return count + (currentString === planId ? 1 : 0) }, 0)
  const [errorStripe, setError] = useState()
  const [isOtherPayment, setIsOtherPayment] = useState(false)

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
      
      const res = await mutateCheckout({
        variables: {
          userId: session?.id,
          custom_price: 3333,
          planId: planId,
          token: '',
        }
      })
      res.data.checkoutSubscription ? setFormState('success') : setFormState('failure')
      nProgress.done()
  
    } catch (error) {
      console.log('SubscriptionItem Create Error: ');
      console.log(error);
      
    }
  }

  return (<>

    <StyledCheckoutForm onSubmit={handleSubmit} >

      {userPlanIdsOwned.includes(planId) && (
        <Callout 
          intent={'info'} 
          content={(
            <div>
              <p>You already have this subscriptions x{userPlanIdsOwnedCount}</p>
              <Link href={`/account`}> View Account </Link>
            </div>
          )}
        />
      )}

      <div className="buttons-cont">
          <button type="submit" disabled={loading}> Start Subscription </button>
      </div>

    </StyledCheckoutForm>
 

    <ErrorMessage error={error || errorStripe} />

    {loading && (
      <LoadingAnim />
    )}

  </>)
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
  transition: .5s;

  &.disabled{
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }

  .buttons-cont{
    display: flex;

    .payment-methods{
      background-color: transparent;
      border: none;
    }
  }

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
    subscriptionPlan{
      status
      stockMax
    }
  }
}
`

const CREATE_SUBSCRIPTIONITEM = gql`
  mutation CreateSubscriptionItem($data: SubscriptionItemCreateInput!) {
  createSubscriptionItem(data: $data) {
    user {
      id
      subscriptions{
        subscriptionPlan{
          name
        }
        status
      }
    }
    custom_price
    id
    isActive
    isDelinquent
    subscriptionPlan {
      id
      name
      status
    }
  }
}
`