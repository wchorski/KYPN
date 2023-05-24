import styled from "styled-components"
import { INPUT_TYPES, InputObj } from "../../lib/types"
import { useState } from "react";
import useForm2 from "../../lib/useForm2";
import { FormInput } from "../elements/Forminput";
import { gql, useMutation } from "@apollo/client";

const inputs:InputObj[] = [
  {
    name: 'summary',
    type: INPUT_TYPES.TEXT,
    placeholder: '', 
    label: 'Summary',
    errorMessage: 'summary error',
    required: true,
    initial: '',
  },
  {
    name: 'start',
    type: INPUT_TYPES.DATETIME,
    placeholder: '', 
    label: 'Start',
    errorMessage: 'start error',
    required: true,
    initial: '',
  },
  {
    name: 'end',
    type: INPUT_TYPES.DATETIME,
    placeholder: '', 
    label: 'End',
    errorMessage: 'end error',
    required: true,
    initial: '',
  },
  {
    name: 'price',
    type: INPUT_TYPES.NUMBER,
    placeholder: '', 
    label: 'Price per Ticket',
    errorMessage: 'price error',
    required: true,
    initial: '',
  },
  {
    name: 'seats',
    type: INPUT_TYPES.NUMBER,
    placeholder: '', 
    label: 'Number of Seats',
    errorMessage: 'seats error',
    required: true,
    initial: '',
  },
  {
    name: 'description',
    type: INPUT_TYPES.TEXTAREA,
    placeholder: '', 
    label: 'Description',
    errorMessage: 'description error',
    required: false,
    initial: '',
  },
]

export function EventCreateForm() {

  const {values, handleFindProps, handleChange, clearForm, resetForm } = useForm2(inputs)

  const [createEvent, { loading }] = useMutation(EVENT_CREATE)
  
  async function handleSubmit(e:any) {
    e.preventDefault()

    try {

      const formattedValues = {
        ...values,
        ...{
          start: new Date(values.start).toISOString(),
          end: new Date(values.end).toISOString(),
        }
      }

      const res = await createEvent({
        variables: {
          data: formattedValues
        },
        // refetchQueries: [{ query: QUERY_EVENTS_ALL }, { query: QUERY_USER_SINGLE, variables: { where: { id: user?.id }}, },]
      })

      console.log('create event success, ', {res});
      // setIsShown(false)

    } catch (err) {
      console.warn('create event error: ', err);
      
    }
  }
  
  return (
    <StyledEventForm onSubmit={handleSubmit}>
      <fieldset>
        <legend> essential </legend>

        <FormInput 
          {...handleFindProps('summary')}
          value={values['summary']}
          onChange={handleChange}
        />

        <FormInput 
          {...handleFindProps('start')}
          value={values['start']}
          onChange={handleChange}
        />

        <FormInput 
          {...handleFindProps('end')}
          value={values['end']}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset>
        <legend> Info </legend>

        <FormInput 
          {...handleFindProps('price')}
          value={values['price']}
          onChange={handleChange}
          />

        <FormInput 
          {...handleFindProps('seats')}
          value={values['seats']}
          onChange={handleChange}
          />

        <FormInput 
          className='textarea'
          {...handleFindProps('description')}
          value={values['description']}
          onChange={handleChange}
        />
      </fieldset>

      <button type="submit" disabled={loading}>
        Create Event
      </button>

    </StyledEventForm>
  )
}


const EVENT_CREATE = gql`
  mutation Mutation($data: EventCreateInput!) {
    createEvent(data: $data) {
      id
    }
  }
`

const StyledEventForm = styled.form`
  box-shadow: #0000004f 1px 1px 3px;
  background-color: var(--c-txt-rev);
  padding: 1em;
  margin: 1em auto;
  border-radius: 5px;
  max-width: 30em;
  min-width: 20em;

  input,  textarea{
    width: 100%;
  }

  label:has( > textarea){
    margin-top: 2em;
  }

  fieldset{
    padding: 0;
    /* padding-bottom: .5em; */
    margin-bottom: 1em;
    border: none;
    /* border-bottom: #ababab solid 1px; */

    legend{
      text-align: center;
      /* margin-right: 5em; */
      /* transform: translateX(4em); */

      &:before,
      &:after {
        background-color: #929292;
        content: "";
        display: inline-block;
        height: 1px;
        position: relative;
        vertical-align: middle;
        width: 50%;
      }
      &:before {
        right: 0.5em;
        margin-left: -50%;
      }

      &:after {
        left: 0.5em;
        margin-right: -50%;
      }
    }
  }
`