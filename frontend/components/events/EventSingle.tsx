// inspo - https://dice.fm/event/57lpk-housework-24th-may-sleeping-village-chicago-tickets

import { gql, useQuery } from "@apollo/client"
import Image from "next/image"
import { ImageDynamic } from "../elements/ImageDynamic"
import { QueryLoading } from "../menus/QueryLoading"
import ErrorMessage from "../ErrorMessage"
import TicketPopup from "./TicketPopup"
import { useRef, useState } from "react"
import { Event, User } from "../../lib/types"
import TicketsList from "./TicketsList"
import moneyFormatter from "../../lib/moneyFormatter"
import styled from "styled-components"
import { SearchUserTicket } from "../../pages/events/SearchUserTicket"

export default function EventSingle({id}:{id:string}) {

  const [isPopup, setIsPopup] = useState(false)
  const [animTrig, setAnimTrig] = useState(0)
  const [pickedUser, setPickedUser] = useState<User>()

  const { loading, error, data } = useQuery(
    QUERY_EVENT, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  // console.log(data);
  
  const {photo, summary, description, tickets = [], price}:Event = data?.event
  
  return (
    <StyledEventSingle>

      <TicketPopup 
        setIsPopup={setIsPopup} 
        isPopup={isPopup} 
        event={data?.event} 
        user={pickedUser}
        setAnimTrig={setAnimTrig}
      />

      <aside>
        <div className="cont">
          <picture>
            <ImageDynamic photoIn={photo} />
          </picture>
          <strong>{summary}</strong>
        </div>
      </aside>

      <article>
        <h1>{summary}</h1>

        <div className="card call-to-action">
          
          <div className="info-cont">
            <strong>Purchase Ticket</strong> 
            <br/>
            <small>sub text</small> 
          </div>

          <button onClick={() => setIsPopup(true)} className="ticket"> 
            <span>{moneyFormatter(price)}</span>
            per Ticket
          </button>

        </div>

        <h2>About</h2>
        <p>{description}</p>

        <h2>All Ticket Holders</h2>
        <TicketsList tickets={tickets} key={animTrig}/>

        <h2>Edit Attendees</h2>
        <SearchUserTicket ticketId={id} setIsPopup={setIsPopup} setPickedUser={setPickedUser}/>

      </article>
    </StyledEventSingle>
  )
}

const StyledEventSingle = styled.div`
  
  display: flex;

  aside{
    margin-right: 1em;
    flex: 1 6 20%;

    .cont{
      position: sticky;
      top: 2em;
      float: left;

    }
  }

  article{
    flex: 3 1 60%;
  }

  button.ticket{
    span{
      margin-right: .4em;
    }
  }
`


export const QUERY_EVENT = gql`
  query Event($where: EventWhereUniqueInput!) {
    event(where: $where) {
      categories {
        id
        name
      }
      categoriesCount
      dateCreated
      dateModified
      employees {
        email
        id
        name
      }
      photo
      description
      end
      id
      location {
        address
        name
        id
      }
      price
      seats
      start
      status
      summary
      tags {
        id
        name
      }
      tagsCount
      ticketsCount
      tickets{
        id
        status
        qrcode
        holder {
          id
          name
          email
        }
      }
    }
  }
`