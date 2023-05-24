// cred - Web Dev Simp - https://www.youtube.com/watch?v=ywtkJkxJsdg&t=473s

import { gql, useMutation } from '@apollo/client'
import { useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import styled from 'styled-components'
import { Event, User } from '../../lib/types'
import { QUERY_EVENTS_ALL } from './EventList'
import { QUERY_USER_SINGLE } from '../user/UserSingle'
import { QUERY_EVENT } from './EventSingle'

type Props = {
  isPopup: boolean,
  setIsPopup: Dispatch<SetStateAction<boolean>>,
  event?: Event,
  user?: User|undefined,
  setAnimTrig:Dispatch<SetStateAction<number>>,
  isDelete?:boolean,
  ticketId?:string,
}

export default function TicketPopup({isPopup, setIsPopup, event, user, setAnimTrig, isDelete=true, ticketId=''}:Props) {

  const ticketPopupRef = useRef<HTMLDialogElement>(null)

  const [createTicket, { loading }] = useMutation(MUTATE_TICKET_CREATE)
  const [deleteTicket, { loading: loadingDelete }] = useMutation(TICKET_DELETE)

  function handleOnClick(e:React.MouseEvent<HTMLDialogElement, MouseEvent>) {
    e.stopPropagation()
    const { left, right, top, bottom } = e.currentTarget.getBoundingClientRect();
    // if clicked outside of modal's rect
    if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
      setIsPopup(false)
    }
  }

  async function handleSubmit(e:any) {
    // e.preventDefault()

    if(isDelete){
      try {
        const res = await deleteTicket({
          variables: {
            where: { id: ticketId }
          },
          refetchQueries: [
            { query: QUERY_EVENTS_ALL, variables: {orderBy: [{start: 'desc'}] } }, 
            { query: QUERY_EVENT, variables: { where: { id: event?.id }}, }, 
            { query: QUERY_USER_SINGLE, variables: { where: { id: user?.id }}, },
          ]
        })
  
        console.log('tieckt success, ', {res});
        setIsPopup(false)
        setAnimTrig(prev => prev + 1)
  
      } catch (err) {
        console.warn('ticket error: ', err);
      }
    }

    if(!isDelete){
      try {
        const res = await createTicket({
          variables: {
            data: {
              event: {
                connect: {
                  id: event?.id || '',
                }
              },
              holder: {
                connect: {
                  id: user?.id || '',
                }
              },
            }
          },
          refetchQueries: [
            { query: QUERY_EVENTS_ALL, variables: {orderBy: [{start: 'desc'}] } }, 
            { query: QUERY_EVENT, variables: { where: { id: event?.id }}, }, 
            { query: QUERY_USER_SINGLE, variables: { where: { id: user?.id }}, },
          ]
        })
  
        console.log('tieckt success, ', {res});
        setIsPopup(false)
        setAnimTrig(prev => prev + 1)
  
      } catch (err) {
        console.warn('ticket error: ', err);
      }
    }
  }
  
  useEffect(() => {
    if(isPopup) return ticketPopupRef.current?.showModal()
    if(!isPopup) return ticketPopupRef.current?.close()
    // return () =>
  }, [isPopup])
  
  
  if(isDelete) return (
    <StyledPopup 
      ref={ticketPopupRef}
      onClick={handleOnClick}
    >
      <button onClick={e => setIsPopup(false)} disabled={loading}> 
        <RiCloseFill />
      </button>

      <h2> Purchase Ticket </h2>

      <h3>{event?.summary}</h3>

      <ul>
        <li>User Name: {user?.name}</li>
        <li>User Email: {user?.email}</li>
      </ul>

      <button disabled={loading} onClick={handleSubmit}> 
        {loading ? 'Wait...' : 'Assign Ticket'}
      </button>
    </StyledPopup>
  )

  return (
    <StyledPopup 
      ref={ticketPopupRef}
      onClick={handleOnClick}
    >
      <button onClick={e => setIsPopup(false)} disabled={loading}> 
        <RiCloseFill />
      </button>

      <h2> REMOVE Ticket </h2>

      <h3>{event?.summary}</h3>

      <ul>
        <li>User Name: {user?.name}</li>
        <li>User Email: {user?.email}</li>
      </ul>

      <button disabled={loading} onClick={handleSubmit}> 
        {loading ? 'Wait...' : 'Assign Ticket'}
      </button>
    </StyledPopup>
  )
}


const StyledPopup = styled.dialog`

  transition: all 1s;

  &::backdrop{
    transition: all 1s;
    background-color: #00000094;
  }
`

const MUTATE_TICKET_CREATE = gql`
  mutation CreateTicket($data: TicketCreateInput!) {
    createTicket(data: $data) {
      holder {
        id
      }
      event {
        id
      }
      id
    }
  }
`

const TICKET_DELETE = gql`
  mutation Mutation($where: TicketWhereUniqueInput!) {
    deleteTicket(where: $where) {
      id
      holder {
        id
        name
      }
    }
  }
`