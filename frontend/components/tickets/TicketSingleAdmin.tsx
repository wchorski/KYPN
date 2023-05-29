import { FormEvent, useState } from "react"
import { InputObj, Ticket, TicketStatus } from "../../lib/types"
import { useMutation } from "@apollo/client"
import useForm2 from "../../lib/useForm2"
import { StyledFormMini, UPDATE_TICKET } from "../events/TicketListItem"
import { QUERY_TICKET } from "./TicketSingle"
import ErrorMessage from "../ErrorMessage"

type Props = {
  ticket:Ticket,
}

export function TicketSingleAdmin({ticket}:Props) {

  const [isEditing, setIsEditing] = useState(false)
  const inputs:InputObj[] = [

  ]
  const {values, handleChange, handleFindProps} = useForm2(inputs)
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
            status: values.status
          },
        },
        refetchQueries:  [{ query: QUERY_TICKET, variables: { where: { id: ticket.id }}, }],
      })

      setIsEditing(false)
      // console.log({res})
    } catch (error) {
      console.warn('ticket update error, ', error)
    }
  }

  return (
    <section className="admin-panel">

      <h2> Admin Quick Edit </h2>

      {/* <button className="medium"> Redeem </button>
      <br /> */}

      <ErrorMessage error={error}/>

      <StyledFormMini onSubmit={handleSubmit}>
        <fieldset>
          <legend> Ticket Status </legend>
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

            <button type='button' disabled={loading} 
              // onClick={handlePopupDelete} 
              className="delete"
            >
              Delete
            </button>
          </div>
      </StyledFormMini>

    </section>
  )
}

