'use client'
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { useEffect, useRef, useState } from "react"
import { 
  experimental_useFormState as useFormState, 
  experimental_useFormStatus as useFormStatus 
} from "react-dom"

type Fields = any

type FormState = {
  message: string,
  errors: Record<keyof Fields, string> | undefined,
  fieldValues: Fields,
}

type Props = {
  prop?:string
}

export function TicketForm ({ prop }:Props) {

  const formRef = useRef<HTMLFormElement>(null)

  // const [formState, setFormState] = useState<any>({
  //   message: '',
  //   errors: undefined,
  //   fieldValues: {
  //     email: '',
  //     age: '',
  //   }
  // })
  const [formState, formAction] = useFormState(onSubmit, {
    message: '',
    errors: undefined,
    fieldValues: {
      email: '',
      age: '',
    }
  })

  useEffect(() => {
    if(formState.message === 'success'){
      formRef.current?.reset()
    }
  }, [formState])

  async function onSubmit(prevState: FormState, data: FormData): Promise<FormState>{
    
    const email = data.get('email') as string
    const age = data.get('age') as string

    try {

      if(typeof email !== 'string') throw new Error('email is not string')
      if(typeof age !== 'number') throw new Error('age is not number')
      console.log('data: ', data);

      return {
        message: 'success',
        errors: undefined,
        fieldValues: {
          email: '',
          age: '',
        }
      }
      
    } catch (error) {
      return {
        message: 'error',
        errors: {
          email: 'fix email field',
          age: 'fix age field'
        },
        fieldValues: {
          email,
          age,
        }
      }
    }
  }

  return (
    <form
      // action={onSubmit}
      ref={formRef}
    >
      <legend> Ticket Form </legend>

      <div>
        <label htmlFor="email"> Email </label>
        <input 
          name={'email'}
          id={'email'}
          placeholder="yanny@mail.lan"
          type={'text'}
          defaultValue={formState.fieldValues.email}
        />
        <span className="error"> {formState.errors?.email} </span>
      </div>

      <div>
        <label htmlFor="age"> Email </label>
        <input 
          name={'age'}
          id={'age'}
          placeholder="30"
          type={'number'}
          defaultValue={formState.fieldValues.age}
        />
        <span className="error"> {formState.errors?.age} </span>
      </div>

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