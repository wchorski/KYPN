// cred - Web Dev Simp - https://www.youtube.com/watch?v=ywtkJkxJsdg&t=473s

import { gql, useMutation } from '@apollo/client'
import { useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import styled from 'styled-components'

type Props = {
  isShown: boolean,
  setIsShown: Dispatch<SetStateAction<boolean>>,
  eventId: string,
}

export default function TicketPopup({isShown, setIsShown, eventId}:Props) {

  const ticketPopupRef = useRef<HTMLDialogElement>(null)

  const [mutate, { loading }] = useMutation(MUTATE_TICKET_ADD)

  function handleOnClick(e:React.MouseEvent<HTMLDialogElement, MouseEvent>) {
    e.stopPropagation()
    const { left, right, top, bottom } = e.currentTarget.getBoundingClientRect();
    // if clicked outside of modal's rect
    if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
      setIsShown(false)
    }
  }

  async function handleSubmit(e:any) {
    // e.preventDefault()
    try {
      const res = await mutate({
        variables: {
          data: {
            event: {
              connect: {
                id: eventId,
              }
            }
          }
        }
      })

      console.log('tieckt success, ', {res});
      setIsShown(false)

    } catch (err) {
      console.warn('ticket error: ', err);
      
    }
  }
  
  useEffect(() => {
    if(isShown) return ticketPopupRef.current?.showModal()
    if(!isShown) return ticketPopupRef.current?.close()
    // return () =>
  }, [isShown])
  
  
  return (
    <StyledPopup 
      ref={ticketPopupRef}
      onClick={handleOnClick}
    >
      <button onClick={e => setIsShown(false)} disabled={loading}> 
        <RiCloseFill />
      </button>
      <h2> Purchase Tickets </h2>

      <button disabled={loading} onClick={handleSubmit}> 
        {loading ? 'Wait' : 'Buy'}
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

const MUTATE_TICKET_ADD = gql`
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