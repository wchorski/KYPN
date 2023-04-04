import { StyledSickButton } from "@/styles/SickButton.styled"
import { CardElement, Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { FormEvent } from "react"
import styled from "styled-components"

// TODO Add blocker stops stripe.com requests thinks it's X site
const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || 'NO KEY IN ENV')

export default function Checkout() {

  function handleSubmit(e:FormEvent){
    e.preventDefault()
    console.log('check me out');
    
  }

  return (
    <Elements stripe={stripeLib}>
      <StyledCheckoutForm onSubmit={e => handleSubmit(e)}>
        
        <CardElement />

        <StyledSickButton>
          Checkout
        </StyledSickButton>
        
      </StyledCheckoutForm>
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

`