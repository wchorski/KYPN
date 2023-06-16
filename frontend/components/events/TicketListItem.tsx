import { CgClose, CgMenuRound } from "react-icons/cg";
import { Ticket, TicketStatus } from "../../lib/types"
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import useForm from "../../lib/useForm";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { QUERY_EVENTS_ALL } from "./EventList";
import { QUERY_EVENT } from "./EventSingle";
import { QUERY_USER_SINGLE } from "../user/UserSingle";
import { tTicketPopup } from "./TicketPopup";
import { datePrettyLocalDay, datePrettyLocalTime } from "../../lib/dateFormatter";

type Props = {
  ticket:Ticket,
  setPopupData: Dispatch<SetStateAction<tTicketPopup>>,
}


export  function TicketListItem({ticket, setPopupData}:Props) {  

  const [isEditing, setIsEditing] = useState(false)
  const { inputs, handleChange, clearForm, resetForm } = useForm({
      id: '',
      status: '',
    })

  const [updateTicket, {loading, error}] = useMutation(UPDATE_TICKET)


  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    // console.log({inputs});
    
    try {
      const res = await updateTicket({
        variables: {  
          where: {
            id: ticket.id
          },
          data: {
            status: inputs.status
          }
        }
      })

      setIsEditing(false)
      // console.log({res})
    } catch (error) {
      console.warn('ticket update error, ', error)
    }
  }

  function handlePopupDelete(){
    setPopupData({
      ticket: ticket,
      isDelete: true,
    })
  }

  // todo using the `ticket.holder.name` check is a bit hacky but using it for now
  return (
    <StyledTicketItem className='card'>
      <div>
        {ticket.holder.name ? (<>
          <strong>{ticket.holder?.name}</strong> <br />
          <small>{ticket.holder?.email}</small>
        </>) : (<>
          <strong>{ticket.event?.summary}</strong> <br />
          <small> {datePrettyLocalDay(ticket.event?.start || '') } </small> <br />
          <small> {datePrettyLocalTime(ticket.event?.start || '')} </small> <br />
          <small>
            {ticket.event?.location?.name}
            <br />
            {ticket.event?.location?.address}
          </small>
        </>)}
      </div>

      {!isEditing ? (
        <div>
          <strong>{ticket.status}</strong>
        </div>
      ) : (
        <StyledFormMini onSubmit={handleSubmit}>
          <fieldset disabled={loading} className='radio-cont'>
            <legend>status</legend>
            {TicketStatus.map((stat, i) => (
              <label htmlFor="status" key={i}>
                <input 
                  type="radio"
                  name="status"  
                  id={stat.value + '-' + i}
                  value={stat.value}
                  defaultChecked={stat.value === ticket.status ? true : false}
                  onChange={handleChange}
                  // checked={stat.value === t.status ? true : false}
                />
                {stat.value === ticket.status ? <strong>{stat.label}</strong> : <span> {stat.label} </span>}
                {/* <span> {stat.label} </span> */}
              </label>
            ))}
          </fieldset>

          <div className="edit-button-cont">
            <button type='submit' disabled={loading}>
              Update
            </button>

            <button type='button' disabled={loading} onClick={handlePopupDelete} className="delete">
              Delete
            </button>
          </div>

        </StyledFormMini>
      )}

      <button className='edit' data-tooltip="Edit" onClick={() => setIsEditing(!isEditing)}> 
        {!isEditing ? (<CgMenuRound /> ) : (<CgClose />)} 
      </button>
    </StyledTicketItem>
  )
}

const StyledTicketItem = styled.li`
  button svg{
    font-size: 2rem;
  }
`

export const StyledFormMini = styled.form`
  max-width: 15em;
  padding-bottom: 1em;

  fieldset{
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  }

  .edit-button-cont{
    display: flex;
    justify-content: space-between;
  }

  
`

export const UPDATE_TICKET = gql`
  mutation UpdateTicket($where: TicketWhereUniqueInput!, $data: TicketUpdateInput!) {
    updateTicket(where: $where, data: $data) {
      id
      status
    }
  }
`