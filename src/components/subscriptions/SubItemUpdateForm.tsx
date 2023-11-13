'use client'
import ErrorMessage from "@components/ErrorMessage"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { SubscriptionPlan } from "@ks/types"
import { useEffect, useRef } from "react"
import { 
  // @ts-ignore
  experimental_useFormState as useFormState, 
  // @ts-ignore
  experimental_useFormStatus as useFormStatus 
} from "react-dom"

import { useRouter } from 'next/navigation'

type Fields = {
  status:SubscriptionPlan['status'],
}

type FormState = {
  message: string,
  errors: Record<keyof Fields, string> | undefined,
  fieldValues: Fields,
}

type Props = {
  subPlanId:string,
  status:SubscriptionPlan['status']
}

const statusOptions = [
  {value: 'ACTIVE', label: 'Active'},
  {value: 'PAUSED', label: 'Pause'},
  {value: 'CANCELED', label: 'Cancel'},
]

export function SubItemUpdateForm ({ subPlanId, status }:Props) {

  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const defaultFormData = {
    message: '',
    errors: undefined,
    fieldValues: {
      subPlanId: subPlanId,
      status: status,
    }
  }

  const [formState, formAction] = useFormState(onSubmit, defaultFormData)

  useEffect(() => {
    if(formState.message === 'success'){
      formRef.current?.reset()
    }
  }, [formState])

  async function onSubmit(prevState: FormState, data: FormData): Promise<FormState>{

    const status = data.get('status') as string

    const inputValues = {
      status,
    }


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
              id: subPlanId,
            },
            data: {
              status: status
            },
          }
        }),
      })

      const { updateSubscriptionItem, error } = await res.json()
      console.log('subitemForm res, ', {data});
      if(error) throw new Error(error.message)

      if(updateSubscriptionItem) router.push(`/account?dashState=subscriptions#subscriptions`)
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
  
  return (
    <form action={formAction}>
      <fieldset>
        <ul className="radio">
          {statusOptions.map((stat, i) => (
            <label htmlFor="status" key={i}>
              
              <input 
                type="radio"
                name="status"  
                id={stat.value + '-' + i}
                value={stat.value}
                defaultChecked={stat.value === formState.fieldValues.status}
                // onChange={handleChange}
                // checked={stat.value === t.status ? true : false}
              />
              {stat.value === formState.fieldValues.status ? <strong className="current">{stat.label}</strong> : <span> {stat.label} </span>}

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
    <button
      disabled={pending}
      type={'submit'}
      className="button large"
    >
      {pending ? <LoadingAnim /> : 'Update'}
    </button>
  )
}

const query = `
  mutation UpdateSubscriptionItem($where: SubscriptionItemWhereUniqueInput!, $data: SubscriptionItemUpdateInput!) {
    updateSubscriptionItem(where: $where, data: $data) {
      id
      status
    }
  }
`
  //     billing_interval
  //     custom_price
  //     dateCreated
  //     dateModified
  //     stripeId
  //     subscriptionPlan {
  //       id
  //       name
  //     }
  //     user {
  //       email
  //       id
  //       name
  //     }
