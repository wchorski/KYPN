import { StyledSickButton } from "../../styles/SickButton.styled"
import { gql, useMutation } from "@apollo/client"
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useRouter } from "next/router"
import nProgress from "nprogress"
import { FormEvent, useState } from "react"
import styled from "styled-components"
import ErrorMessage from "../ErrorMessage"
import { useCart } from "../../lib/cartState";
import { QUERY_USER_CURRENT, useUser } from "../menus/Session"

// TODO Add blocker stops stripe.com requests thinks it's X site
const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY || 'NO_FRONTEND_STRIPE_KEY_IN_ENV'

const stripeLib = loadStripe(STRIPE_KEY)

function CheckoutFormChild() {

  const session = useUser()

  const router = useRouter()
  const { closeCart } = useCart()
  const [errorStripe, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const [mutate, { error, loading, data }] = useMutation(MUTATE_CHECKOUT_ORDER, {
    refetchQueries: [{ query: QUERY_USER_CURRENT }]
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    nProgress.start()

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

    const res = await mutate({
      variables: {
        token: paymentMethod.id,
      }
    })
    console.log('FINISHED ORDER', res);

    setIsLoading(false)
    nProgress.done()
    console.log('check end')

    closeCart()

    router.push(`/shop/orders/${res.data.checkout.id}`)
  }

  return (
    <StyledCheckoutForm onSubmit={e => handleSubmit(e)}>

      {errorStripe || error && <ErrorMessage error={errorStripe || error} />}

      <CardElement />

      <StyledSickButton disabled={isLoading}>
        Checkout
      </StyledSickButton>

    </StyledCheckoutForm>
  )
}

export function CheckoutForm() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormChild />
    </Elements>
  )
}

const MUTATE_CHECKOUT_ORDER = gql`
  mutation Checkout($token: String!) {
    checkout(token: $token) {
      id
    }
  }
`

const StyledCheckoutForm = styled.form`
  box-shadow: 0 1px 2px 2px black;
  background-color: azure;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;

`