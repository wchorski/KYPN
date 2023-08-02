import styled from "styled-components"
import { FormInput } from "../elements/Forminput"
import useForm2 from "../../lib/useForm2"
import { InputObj } from "../../lib/types"
import { gql, useMutation } from "@apollo/client"
import ErrorMessage from "../ErrorMessage"
import { useState } from "react"
import StatusMessage from "../elements/StatusMessage"
import Link from "next/link"


const statusOptions = [
  {value: 'ACTIVE', label: 'Active'},
  {value: 'PAUSED', label: 'Pause'},
  {value: 'CANCELED', label: 'Cancel'},
]

type Props = {
  id:string,
  subPlanId:string,
  userId:string,
  status:'ACTIVE'|'CANCELED'|'PAUSED'|string,
  // custom_price:number,
}

export function SubItemUpdateForm({ id, subPlanId, userId, status }:Props) {

  const [formState, setFormState] = useState<'success'|'failure'|''>('')

  const inputs:InputObj[] = [

    {
      name: 'status',
      type: 'text',
      placeholder: '', 
      // options: statusOptions,
      errorMessage: 'status choice error',
      label: 'Status',
      initial: status,
      required: true,
    },
    
  ]

  const {values, setValues, handleFindProps, handleChange, clearForm, resetForm } = useForm2(inputs)
  const [updateSubItem, { loading, error }] = useMutation(UPDATE_SUBITEM)

  async function handleSubmit(e:any){
    e.preventDefault()

    let valuesFormat = {
      ...values,
      user: {
        connect: {
          id: userId
        }
      },
      subscriptionPlan: {
        connect: {
          id: subPlanId
        }
      }
    }
    // console.log(valuesFormat)

    // //? other data i may put in
    // {
    //   "where": null,
    //   "data": {
    //     "status": null,
    //     "subscriptionPlan": {
    //       "connect": {
    //         "id": null
    //       }
    //     },
    //     "user": {
    //       "connect": {
    //         "id": null
    //       }
    //     },
    //     "custom_price": null,
    //     "billing_interval": null
    //   }
    // }

    try {

      const res = await updateSubItem({
        variables: {
          where: {
            id: id
          },
          data: valuesFormat,
          // refetchQueries: [{ query: QUERY_EVENTS_ALL }, { query: QUERY_EVENT, variables: { where: { id: event?.id }}, },]
        },
      })
      console.log('update subitem success, ')
      // console.log(res.data.updateSubscriptionItem);
      
      if(res.data.updateSubscriptionItem) {
        setFormState('success') 
      } else {
        setFormState('failure')
      }
      // router.push(`/events/e/${res.data.updateEvent.id}`)
      
    } catch (error) {
      console.warn('subitem update error: ', error);
      
    }

  }

  if(formState === 'success') return (
    <StatusMessage  status={formState} message={'subscription update successful'}>
      <Link href={`/account`}> My Account </Link>
    </StatusMessage>
  )

  if(formState === 'failure') return (
    <StatusMessage  status={formState} message={'subscription update failed'}>
      <p> refesh the page and try again </p>
    </StatusMessage>
  )

  return (
    <StyledSubItemForm onSubmit={handleSubmit}>
      <legend> Update Subscription </legend>

      <fieldset>
        <ul className="radio">
          {statusOptions.map((stat, i) => (
            <label htmlFor="status" key={i}>
              <input 
                type="radio"
                name="status"  
                id={stat.value + '-' + i}
                value={stat.value}
                defaultChecked={stat.value === status ? true : false}
                onChange={handleChange}
                // checked={stat.value === t.status ? true : false}
              />
              {stat.value === status ? <strong>{stat.label}</strong> : <span> {stat.label} </span>}

            </label>
          ))}
        </ul>
      </fieldset>

      <ErrorMessage error={error} />

      <button type="submit" disabled={loading}> Update </button>
    </StyledSubItemForm>
  )
}


const StyledSubItemForm = styled.form`
  ul.radio{
    padding: 0;
    display: flex;
    flex-direction: column;

    label{
      margin-bottom: 1rem;
    }
  }
`

const UPDATE_SUBITEM = gql`
  mutation UpdateSubscriptionItem($where: SubscriptionItemWhereUniqueInput!, $data: SubscriptionItemUpdateInput!) {
    updateSubscriptionItem(where: $where, data: $data) {
      billing_interval
      custom_price
      dateCreated
      dateModified
      id
      status
      stripeId
      subscriptionPlan {
        id
        name
      }
      user {
        email
        id
        name
      }
    }
  }

`