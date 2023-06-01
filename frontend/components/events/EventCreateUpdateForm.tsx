import styled from "styled-components"
import { Event, INPUT_TYPES, InputObj, Location } from "../../lib/types"
import { useState } from "react";
import useForm2 from "../../lib/useForm2";
import { FormInput } from "../elements/Forminput";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { QUERY_EVENTS_ALL } from "./EventList";
import { QUERY_EVENT } from "./EventSingle";
import ErrorMessage from "../ErrorMessage";

type Props = {
  event?:Event,
  locationOptions: any[],
}

export function EventCreateUpdateForm({event, locationOptions}:Props) {

  const router = useRouter()
  // console.log(event?.start);
  // console.log(convertISOtoLocale(event?.start));
  const inputs:InputObj[] = [
    {
      name: 'summary',
      type: INPUT_TYPES.TEXT,
      placeholder: '', 
      label: 'Summary',
      errorMessage: 'summary error',
      required: true,
      initial: event?.summary || '',
    },
    {
      name: 'start',
      type: INPUT_TYPES.DATETIME,
      placeholder: '', 
      label: 'Start',
      errorMessage: 'start error',
      required: true,
      initial: convertISOtoLocale(event?.start),
    },
    {
      name: 'end',
      type: INPUT_TYPES.DATETIME,
      placeholder: '', 
      label: 'End',
      errorMessage: 'end error',
      required: true,
      initial: convertISOtoLocale(event?.end),
    },
    {
      name: 'location',
      type: INPUT_TYPES.SELECT,
      placeholder: '', 
      label: 'Location',
      errorMessage: 'location error',
      required: true,
      options: locationOptions, 
      initial: '',
    },
    {
      name: 'price',
      type: INPUT_TYPES.NUMBER,
      placeholder: '', 
      label: 'Price per Ticket',
      errorMessage: 'price error',
      required: true,
      initial: String(event?.price) || '',
    },
    {
      name: 'seats',
      type: INPUT_TYPES.NUMBER,
      placeholder: '', 
      label: 'Number of Seats',
      errorMessage: 'seats error',
      required: true,
      initial: String(event?.seats) || '',
    },
    {
      name: 'description',
      type: INPUT_TYPES.TEXTAREA,
      placeholder: '', 
      label: 'Description',
      errorMessage: 'description error',
      required: false,
      initial: event?.description || '',
    },
  ]

  const {values, handleFindProps, handleChange, clearForm, resetForm } = useForm2(inputs)

  // const {data: dataLocations, loading: loadingLocations, error: errorLocations} = useQuery(QUERY_LOCATIONS)
  const [createEvent, { loading, error }] = useMutation(EVENT_CREATE)
  const [updateEvent, { loading: updating, error: updateError }] = useMutation(EVENT_UPDATE)
  
  async function handleSubmit(e:any) {
    e.preventDefault()

    try {
      
      const formattedValues = {
        ...values,
        ...{
          start: new Date(values.start).toISOString(),
          end: new Date(values.end).toISOString(),
          seats: Number(values.seats),
          price: Number(values.price)
        }
      }

      
      
      // todo connect location if it exists
      if (values.location !== '' ) {
        Object.assign(formattedValues, {
          location: {
            connect: {
              id: values.location
            }
          },
        })
      }
      console.log({values});
      console.log({formattedValues});
      
      // if id exists, then update existing event
      if(event){
        const res = await updateEvent({
          variables: {
            where: {
              id: event.id
            },
            data: formattedValues,
            refetchQueries: [{ query: QUERY_EVENTS_ALL }, { query: QUERY_EVENT, variables: { where: { id: event?.id }}, },]
          },
        })
        console.log('update event success, ', {res});
        router.push(`/events/e/${res.data.updateEvent.id}`)

      } else {
        const res = await createEvent({
          variables: {
            data: formattedValues
          },
          // refetchQueries: [{ query: QUERY_EVENTS_ALL }, { query: QUERY_USER_SINGLE, variables: { where: { id: user?.id }}, },]
        })
        console.log('create event success, ', {res});
        router.push(`/events/e/${res.data.createEvent.id}`)
      }
        // setIsShown(false)
  
      } catch (err) {
        console.warn('create event error: ', err);
      }
  }

  // function getLocationOptions(){
  //   return dataLocations.locations.map((loc:Location) => ({value: loc.id, label: loc.name}))
  // }

  // const locationOptions = dataLocations.locations.map((loc:Location) => ({value: loc.id, label: loc.name}))
  // console.log({locationOptions});
   
  
  return (
    <StyledEventForm onSubmit={handleSubmit}>
      <ErrorMessage error={error || updateError} />
      
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
          // onChange={handleChange}
          onChange={(e:any) => {
            handleChange(e)
            console.log(e.target.value);
            
          }}
        />

        <FormInput 
          {...handleFindProps('end')}
          value={values['end']}
          onChange={handleChange}
        />

        <FormInput 
          {...handleFindProps('location')}
          value={values['location']}
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

      <button type="submit" disabled={loading || updating} className="medium">
        {event ? 'Update' : 'Create'} Event
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

const EVENT_UPDATE = gql`
  mutation UpdateEvent($where: EventWhereUniqueInput!, $data: EventUpdateInput!) {
    updateEvent(where: $where, data: $data) {
      id
      summary
      start
      end
      price
      seats
      status
      description
      dateModified
      location{
        id
        name
      }
    }
  }
`

// const QUERY_LOCATIONS = gql`
//   query Locations {
//     locations {
//       id
//       name
//     }
//   }
// `

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

function convertISOtoLocale(isoString:string|undefined){

  if(!isoString) return ''

  const date = new Date(isoString);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    // timeZone: 'local',
  };

  // @ts-ignore
  return date.toLocaleString('en-CA', options).replace(', ', 'T');
}