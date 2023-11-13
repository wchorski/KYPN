'use client'
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { useEffect, useRef } from "react"
import { 
  // @ts-ignore
  experimental_useFormState as useFormState, 
  // @ts-ignore
  experimental_useFormStatus as useFormStatus 
} from "react-dom"

import formStyles from '@styles/menus/form.module.scss'
import { Event, User } from "@ks/types"
import { envs } from "@/envs"
import { loadStripe } from "@stripe/stripe-js"

type Fields = {
  // event: string,
  email: string,
  quantity: number,
}

type FormState = {
  message: string,
  errors: Record<keyof Fields, string> | undefined,
  fieldValues: Fields,
}

type Props = {
  event:Event,
  user?:User,
}

export function TicketForm ({ event, user }:Props) {

  const formRef = useRef<HTMLFormElement>(null)

  const defaultFormData = {
    message: '',
    errors: undefined,
    fieldValues: {
      // event: event.id || '',
      email: user?.email || '',
      quantity: 1,
    }
  }

  const [formState, formAction] = useFormState(onSubmit, defaultFormData)

  useEffect(() => {
    if(formState.message === 'success'){
      formRef.current?.reset()
    }
  }, [formState])

  async function onSubmit(prevState: FormState, data: FormData): Promise<FormState>{
    // console.log('START FORM');
    console.log({data});
    
    const email = data.get('email') as string
    // const event = data.get('event') as string
    const quantity = Number(data.get('quantity') as string)

    const inputValues = {
      email,
      event: event.id,
      quantity
    }
    console.log({inputValues});
    


    try {

      if(!envs.STRIPE_PUBLIC_KEY) return {
        ...formState,
        message: '!!! NO STRIPE PUBLIC KEY'
      }

      const stripe = await loadStripe(envs.STRIPE_PUBLIC_KEY as string);
      if (!stripe) throw new Error('Stripe failed to initialize.');

      if(typeof email !== 'string') throw new Error('email is not string')
      // if(typeof event !== 'string') throw new Error('event is not string')
      if(typeof quantity !== 'number') throw new Error('quantity is not number')

      const res = await fetch(`/api/checkout/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          event: event.id,
          quantity,
        }),
      })

      const data = await res.json()
      // console.log('Ticketform res, ', {data});

      const { sessionId, message , isSeatsAvailable, error } = data

        if(!isSeatsAvailable) return {
          ...formState,
          message: message
        }

        const stripeError = await stripe.redirectToCheckout({sessionId});

        if (stripeError) {
          console.log('!!! StripeCheckoutButton stripe Error: ');
          console.error(stripeError);
          
          return {
            ...formState,
            message: stripeError
          }
        }

      return {
        ...formState,
        message: 'success',
      }
      
    } catch (error:any) {
      console.log(error);
      
      return {
        message: error?.message,
        // TODO validate each field
        errors: {
          // event: '',
          email: '',
          quantity: ''
        },
        fieldValues: inputValues
      }
    }
  }

  return (
    <form
      action={formAction}
      ref={formRef}
      className={formStyles.form} 
    >
      <fieldset>
        <legend> Get Tickets </legend>

        {/* <label htmlFor="event">
          <span> Event </span>
          <input 
            name={'event'}
            id={'event'}
            placeholder=""
            type={'text'}
            defaultValue={formState.fieldValues.event}
            readOnly={true}
          />
          <span className="error"> {formState.errors?.event} </span>
        </label> */}

        <label htmlFor="email">
          <span> Email </span>
          <input 
            name={'email'}
            id={'email'}
            placeholder="yanny@mail.lan"
            type={'text'}
            defaultValue={formState.fieldValues.email}
            readOnly={formState.fieldValues.email}
          />
          <span className="error"> {formState.errors?.email} </span>
        </label>

        <label htmlFor="age">
          <span> Quantity </span>
          <input 
            name={'quantity'}
            id={'quantity'}
            placeholder="1"
            type={'number'}
            defaultValue={formState.fieldValues.quantity}
          />
          <span className="error"> {formState.errors?.quantity} </span>
        </label>
      </fieldset>

      <p className={(formState.message === 'success') ? 'success' : 'error'}> 
        {formState.message} 
      </p>

      <SubmitButton />
    </form>
  )
}


function SubmitButton(){

  const { pending, } = useFormStatus()

  return(
    <button
      disabled={pending}
      type={'submit'}
    >
      {pending ? <LoadingAnim /> : 'Submit'}
    </button>
  )
}