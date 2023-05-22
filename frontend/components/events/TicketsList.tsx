import React from 'react'
import styled from 'styled-components'
import { Ticket, TicketStatus } from '../../lib/types'

type Props ={ 
  tickets:Ticket[]
}

export default function TicketsList({tickets = []}:Props) {
  

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
        <form>
          <fieldset>
            <legend>status</legend>
            {TicketStatus.map((stat, i) => (<>
              <label htmlFor="active">
                <input 
                  type="radio"
                  name="status"  
                  id={stat.value + '-' + i}
                  value={stat.value}
                  defaultChecked={stat.value === t.status ? true : false}
                  // checked={stat.value === t.status ? true : false}
                />
                <span> {stat.label}</span>
              </label>
              <br />
            </>))}
          </fieldset>
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