import React, { FormEvent } from 'react'
import styled from 'styled-components'
import { Ticket, TicketStatus } from '../../lib/types'
import { gql, useMutation } from "@apollo/client";
import useForm from '../../lib/useForm';

type Props ={ 
  tickets:Ticket[]
}

export default function TicketsList({tickets = []}:Props) {
  
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    id: '',
    status: '',
  })


  async function handleSubmit(e:FormEvent<HTMLFormElement>, id:string){
    e.preventDefault()

    console.log({inputs});
    

    try {
      const res = await updateTicket({
        variables: {  
          where: {
            id: id
          },
          data: {
            status: inputs.status
          }
        }
      })

      console.log({res})

      
    } catch (error) {
      console.warn('ticket update error, ', error)
    }
    
  }

  const [updateTicket, {loading, error, data}] = useMutation(UPDATE_TICKET)


  if(tickets.length === 0) return (
    <p> no tickets have been purchased for this event </p>
  )

  return (
    <StyledTicketList>
      {tickets.map(t => (
        <li key={t.id} className='card'>
          <div>
            <span>{t.holder?.name}</span> <br />
            <span>{t.holder?.email}</span>
          </div>

        <form onSubmit={e => handleSubmit(e, t.id)}>
          <fieldset>
            <legend>status</legend>
            {TicketStatus.map((stat, i) => (<>
              <label htmlFor="status">
                <input 
                  type="radio"
                  name="status"  
                  id={stat.value + '-' + i}
                  value={stat.value}
                  defaultChecked={stat.value === t.status ? true : false}
                  onChange={handleChange}
                  // checked={stat.value === t.status ? true : false}
                />
                {stat.value === t.status ? <strong>{stat.label}</strong> : <span> {stat.label} </span>}
                {/* <span> {stat.label} </span> */}
              </label>
              <br />
            </>))}
          </fieldset>

          <button type='submit'>
            Update
          </button>

        </form>

        </li>
      ))}
    </StyledTicketList>
  )
}


const StyledTicketList = styled.ul`
  
  list-style: none;
  padding: 0;

  li{
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;

    /* label span{
      text-transform: lowercase;  
      display: inline-block;
    }
    label span:first-letter {
      text-transform: uppercase;
    } */
  }
`

const UPDATE_TICKET = gql`
  mutation UpdateTicket($where: TicketWhereUniqueInput!, $data: TicketUpdateInput!) {
    updateTicket(where: $where, data: $data) {
      id
      status
    }
  }
`