// cred - Web Dev Simp - https://www.youtube.com/watch?v=ywtkJkxJsdg&t=473s

import { gql, useMutation } from '@apollo/client'
import { useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import styled from 'styled-components'
import { Event, Ticket, User } from '../../lib/types'
import { QUERY_EVENTS_ALL } from './EventList'
import { QUERY_USER_SINGLE } from '../user/UserSingle'
import { QUERY_EVENT } from './EventSingle'

export type tTicketPopup = {
  user?:User,
  ticket?:Ticket,
  event?:Event,
  isDelete?:boolean,
}|undefined

type Props = {
  isPopup?: boolean,
  setIsPopup?: Dispatch<SetStateAction<boolean>>,
  event?: Event,
  user?: User|undefined,
  setAnimTrig:Dispatch<SetStateAction<number>>,
  isDelete?:boolean,
  ticketId?:string,
  popupData: tTicketPopup,
  setTicketPopupData: Dispatch<SetStateAction<tTicketPopup>>,
  setAttendingEventIds?:Dispatch<SetStateAction<(string|undefined)[]|undefined>>,
}

const today = new Date().toISOString()

export default function TicketPopup({isPopup, setIsPopup, event, user, setAnimTrig, isDelete=false, ticketId='', popupData, setTicketPopupData, setAttendingEventIds}:Props) {

  const ticketPopupRef = useRef<HTMLDialogElement>(null)

  const [createTicket, { loading }] = useMutation(MUTATE_TICKET_CREATE)
  const [deleteTicket, { loading: loadingDelete }] = useMutation(TICKET_DELETE)

  function handleOnClick(e:React.MouseEvent<HTMLDialogElement, MouseEvent>) {
    e.stopPropagation()
    const { left, right, top, bottom } = e.currentTarget.getBoundingClientRect();
    // if clicked outside of modal's rect
    if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
      // setIsPopup(false)
      setTicketPopupData(undefined)
    }
  }

  async function handleDelete(){
    console.log({popupData});
    
    try {
      const res = await deleteTicket({
        variables: {
          where: { id: popupData?.ticket?.id }
        },
        refetchQueries: [
          { query: QUERY_EVENTS_ALL, variables: {where:{
            start: {
              gte: today,
            }
          }, orderBy: [{start: 'desc'}] } }, 
          { query: QUERY_EVENT, variables: { where: { id: popupData?.ticket?.event?.id }}, }, 
          { query: QUERY_USER_SINGLE, variables: { where: { id: popupData?.ticket?.holder?.id }}, },
        ]
      })

      console.log('ticket deleted, ', {res});
      // @ts-ignore
      // const updatedEventIds = attendingEventIds.filter(id => id !== event.id);
      // setAttendingEventIds(updatedEventIds)
      setAttendingEventIds(prev => prev.filter(id => id !== popupData?.ticket?.event.id))
      // setIsPopup(false)
      setTicketPopupData(undefined)
      setAnimTrig(prev => prev + 1)

    } catch (err) {
      console.warn('ticket error: ', err);
    }
    
  }

  async function handleCreate() {
    try {
      const res = await createTicket({
        variables: {
          data: {
            event: {
              connect: {
                id: popupData?.event?.id || '',
              }
            },
            holder: {
              connect: {
                id: popupData?.user?.id || '',
              }
            },
          }
        },
        refetchQueries: [
          { query: QUERY_EVENTS_ALL,  variables: { orderBy: [{start: 'desc'}] } }, 
          { query: QUERY_EVENT,       variables: { where: { id: popupData?.event?.id }}, }, 
          { query: QUERY_USER_SINGLE, variables: { where: { id: popupData?.user?.id }}, },
        ]
      })

      // console.log('tieckt success, ', {res});
      // setIsPopup(false)
      
      setTicketPopupData(undefined)
      setAnimTrig(prev => prev + 1)
      if(setAttendingEventIds){
        //@ts-ignore
        setAttendingEventIds(prev => [...prev, popupData?.event?.id])
      }

    } catch (err) {
      console.warn('ticket error: ', err);
    }
  }
  
  useEffect(() => {
    if(popupData) return ticketPopupRef.current?.showModal()
    if(!popupData) return ticketPopupRef.current?.close()
    // if(isPopup) return ticketPopupRef.current?.showModal()
    // if(!isPopup) return ticketPopupRef.current?.close()
    // return () =>
  }, [popupData])  
  

  // ? if it's user & event show RSVP
  return (<>
    <StyledPopup 
      ref={ticketPopupRef}
      onClick={handleOnClick}
      className={(popupData?.isDelete && popupData?.ticket) ? 'open' : ''}
    >
      <button onClick={() => setTicketPopupData(undefined)} disabled={loading} data-tooltip={'close'} className='edit'> 
        <RiCloseFill />
      </button>

      <h2> Delete Ticket </h2>

      <h3>{popupData?.ticket?.event?.summary}</h3>

      <ul>
        <li>User Name: {popupData?.ticket?.holder?.name}</li>
        <li>User Email: {popupData?.ticket?.holder?.email}</li>
        <li>Event: {popupData?.ticket?.event?.summary}</li>
        <li>Ticket: {popupData?.ticket?.id}</li>
      </ul>

      <button disabled={loading} onClick={handleDelete} className='delete'> 
        {loading ? 'Wait...' : 'Delete'}
      </button>
    </StyledPopup>


    <StyledPopup 
      ref={ticketPopupRef}
      onClick={handleOnClick}
    >
      <button onClick={e => setTicketPopupData(undefined)} disabled={loading} data-tooltip={'close'} className='edit'> 
        <RiCloseFill />
      </button>

      <h2> Purchase Ticket </h2>

      <h3>{event?.summary}</h3>

      <ul>
        <li>User Name: {popupData?.user?.name}</li>
        <li>User Email: {popupData?.user?.email}</li>
      </ul>

      <button disabled={loading} onClick={handleCreate}> 
        {loading ? 'Wait...' : 'Assign Ticket'}
      </button>
    </StyledPopup>
  </>)
}


const StyledPopup = styled.dialog`

  opacity: 0;
  transform: scale(.1);
  transition: all 2s;
  pointer-events: none;

  &[open]{
    opacity: 1;
    transform: scale(1);
    pointer-events: all;
  }

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