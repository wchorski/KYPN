// inspo - https://codepen.io/z-/pen/MJKNJZ

import { gql, useQuery } from "@apollo/client"
import styled from "styled-components"
import ErrorMessage from "../ErrorMessage"
import { QueryLoading } from "../menus/QueryLoading"
import { datePretty, datePrettyLocalDay } from "../../lib/dateFormatter"
import { Ticket } from "../../lib/types"
import { QRCode } from "./QRCode"
import { TicketSingleAdmin } from "./TicketSingleAdmin"
import { useUser } from "../menus/Session"

type Props = {
  id:string,
}

export  function TicketSingle({id}:Props) {

  const session = useUser()
  const { loading, error, data } = useQuery(
    QUERY_TICKET, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  // console.log(data);
  // console.log(id);
  if(!data.ticket) return <p> 404: Ticket not found </p>
console.log(data.ticket);

  const {event, status, holder}:Ticket = data?.ticket
  
  return (<>
  
    <StyledTicketSingle>
      <div className="meta-short">
        <strong>{datePrettyLocalDay(event.start || '')}</strong>
      </div>

      <div className="rip"></div>

      <div className="details">
        <h2>{event.summary}</h2>
        <p>{datePretty(event.start || '')}</p>
        <p>{event.location?.name}</p>
        <p>{holder?.name}</p>
      </div>

      <div className="qrcode-cont">
        <QRCode link={`/tickets/${id}`} />
      </div>

      <span className="status">{status}</span>
    </StyledTicketSingle>

    {/* // TODO only show if session user is admin or employee to event */}
    {session && (event?.hosts?.map(host => host.id).includes(session.id) || session.isAdmin) && (
      <TicketSingleAdmin ticket={data?.ticket}/>
    )}
  </> )
}


const StyledTicketSingle = styled.article`
  border: solid 1px var(--c-3);
  box-shadow: var(--boxs-1);
  position: relative;
  display: flex;
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-radius: var(--br-sharp);

  .meta-short{
    padding: 1em;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details{
    border-left: dashed 1px #e0e0e0;
    padding: 1em;
  }

  .qrcode-cont{
    margin-left: auto;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .status{
    background-color: var(--c-3);
    color: var(--c-txt-rev);
    padding: .1em 1em .1em 1em;
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 15px 0 0 0;
  }

  .rip {  
    background-color: #291eee;
    height: 20px;
    margin: 0 10px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAACCAYAAAB7Xa1eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAAaSURBVBhXY5g7f97/2XPn/AcCBmSMQ+I/AwB2eyNBlrqzUQAAAABJRU5ErkJggg==);
    background-size: 4px 2px;
    background-repeat: repeat-x;
    background-position: center;
    position: relative;
    box-shadow: 0 1px 0 0 #fff, 0 -1px 0 0 #fff;
    &:before,
    &:after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        border: 5px solid transparent;
        border-top-color: #fff;
        border-right-color: #fff;
        border-radius: 100%;
        pointer-events:none;
    }
    &:before {
        left: -10px;
    }
    &:after {
        transform: translate(-50%, -50%) rotate(225deg);
        right: -40px;
    }
  }
       

`

export const QUERY_TICKET = gql`
  query Ticket($where: TicketWhereUniqueInput!) {
    ticket(where: $where) {
      qrcode
      id
      status
      holder {
        id
        name
      }
      event {
        id
        summary
        location {
          name
          address
          id
        }
        hosts{
          id
        }
        start
        end
        price
        photo
        status
      }
    }
  }
`