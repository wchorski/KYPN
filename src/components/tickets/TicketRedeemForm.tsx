'use client'
import { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/navigation'
import { 
  useFormState, 
  useFormStatus 
} from "react-dom"
import { Ticket } from "@ks/types"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { Button } from "@components/elements/Button"

type Props = {
  ticketId:string
  status:string,
}

type Fields = {
  status:Ticket['status'],
}

type FormState = {
  message: string,
  errors: Record<keyof Fields, string> | undefined,
  fieldValues: Fields,
}

const statusOptions = [
  {value: 'ATTENDED', label: 'Attended'},
  {value: 'CONFIRMED', label: 'Unredeemed'},
]

export function TicketRedeemForm ({ ticketId, status }:Props) {

  const [statusState, setStatusState] = useState(status)

  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const defaultFormData = {
    message: '',
    errors: undefined,
    fieldValues: {
      ticketId: ticketId,
      status: status,
    }
  }
  const [formState, formAction] = useFormState(onSubmit, defaultFormData)

  async function onSubmit(prevState: FormState, data: FormData): Promise<FormState>{

    const status = data.get('status') as string

    const inputValues = {
      status,
    }
    console.log({inputValues});

    try {

      if(typeof status !== 'string') throw new Error('status is not string')

      const res = await fetch(`/api/gql/protected`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: {
            where: {
              id: ticketId,
            },
            data: {
              status: status
            },
          }
        }),
      })

      const { updateTicket, error } = await res.json()
      console.log('ticketRedeemForm res, ', updateTicket);
      if(error) throw new Error(error.message)

      if(updateTicket) {
        setStatusState(inputValues.status)
        router.refresh()
        router.push(`/tickets/${ticketId}`)
      }
      // const { sessionId, message, error } = data


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
          status: '',
        },
        fieldValues: inputValues
      }
    }
  }

  // useEffect(() => {
  //   if(formState.message === 'success'){
  //     formRef.current?.reset()
  //   }
  // }, [formState])
  
  return (
    <form action={formAction} ref={formRef}>
      {statusState}
      <fieldset>
        <ul className="radio">
          {statusOptions.map((stat, i) => (
            <label htmlFor="status" key={i}>
              
              <input 
                type="radio"
                name="status"  
                id={stat.value + '-' + i}
                value={stat.value}
                defaultChecked={stat.value === statusState}
                // onChange={handleChange}
                // checked={stat.value === t.status ? true : false}
              />
              {stat.value === statusState ? <strong className="current">{stat.label}</strong> : <span> {stat.label} </span>}

            </label>
          ))}
        </ul>
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
    // <button
    //   disabled={pending}
    //   type={'submit'}
    //   className="button large"
    // >
    //   {pending ? <LoadingAnim /> : 'Update'}
    // </button>
    <Button size={'small'} type={'submit'} disabled={pending}> Update </Button>
  )
}

const query = `
  mutation UpdateTicket($where: TicketWhereUniqueInput!, $data: TicketUpdateInput!) {
    updateTicket(where: $where, data: $data) {
      status
    }
  }
`