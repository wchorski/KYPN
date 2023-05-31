// inspo - https://dice.fm/event/57lpk-housework-24th-may-sleeping-village-chicago-tickets

import { gql, useQuery } from "@apollo/client"
import Image from "next/image"
import { ImageDynamic } from "../elements/ImageDynamic"
import { QueryLoading } from "../menus/QueryLoading"
import ErrorMessage from "../ErrorMessage"
import TicketPopup, { tTicketPopup } from "./TicketPopup"
import { useRef, useState } from "react"
import { Event, Ticket, User } from "../../lib/types"
import TicketsList from "./TicketsList"
import moneyFormatter from "../../lib/moneyFormatter"
import styled from "styled-components"
import { SearchUserTicket } from "../../pages/events/SearchUserTicket"
import { datePrettyLocalDay, datePrettyLocalTime } from "../../lib/dateFormatter"
import { RiFileEditFill } from "react-icons/ri"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
import Link from "next/link"
import { AttendeeTable } from "./AttendeeTable"
import { useUser } from "../menus/Session"


export default function EventSingle({id}:{id:string}) {

  const session = useUser()
  console.log({session});
  
  const [isPopup, setIsPopup] = useState(false)
  const [ticketPopupData, setTicketPopupData] = useState<tTicketPopup>()
  const [animTrig, setAnimTrig] = useState(0)
  const [pickedUser, setPickedUser] = useState<User>()

  const { loading, error, data } = useQuery(
    QUERY_EVENT, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  // console.log(data);
  // console.log(id);
  if(!data.event) return <p> 404: Event not found </p>

  const {photo, summary, description, tickets = [], price, start, seats, hosts, location}:Event = data?.event
  
  return (
    <StyledEventSingle>

      <TicketPopup 
        popupData={ticketPopupData}
        setTicketPopupData={setTicketPopupData}
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
          <br />
          <small>{datePrettyLocalDay(start || '')}</small>
          <address>
            {location?.name}
            <br />
            {location?.address}
          </address>
        </div>
      </aside>

      <article>
        <header>
          <h1>{summary}</h1>
          <ul className="meta">
            <li>{datePrettyLocalDay(start || '')}</li>
            <li>{datePrettyLocalTime(start || '')}</li>
            <li># of seats: {seats}</li>
            <li>
              <address>
                {location?.name}
                <br />
                {location?.address}
              </address>
            </li>
          </ul>
        </header>

        <div className="card call-to-action">
          
          <div className="info-cont">
            <strong>Purchase Ticket</strong> 
            <br/>
            <small>sub text</small> 
          </div>

          <button onClick={() => setIsPopup(true)} className="ticket"> 
            {price && price > 0 ? (
              <span>{moneyFormatter(price)} per Ticket</span>
            ) : (
              <span> Free </span>
            )}
          </button>

        </div>

        <h2>About</h2>
        <p>{description}</p>

        <hr />
        {/* //todo have multiple hosts */}
        {/* {session && (host?.id === session.id || session.isAdmin) && ( */}
        {session && (hosts?.map(host => host.id).includes(session.id) || session.isAdmin) && (
          <section className="admin-panel">
            <h2> Host Panel </h2>

            <h3>Hosts</h3>
            <ul>
              {hosts?.map(host => (
                <li key={host?.id}>
                  <Link href={`/users/${host?.id}`}> {host?.name} | {host?.email} </Link>
                </li>
              ))}
            </ul>

            <Link href={`/events/edit/${id}`} className="medium">
              <RiFileEditFill />
              Edit Event Details
            </Link>

            <h3>Edit Attendees</h3>
            <SearchUserTicket  eventId={id} setIsPopup={setIsPopup} setPickedUser={setPickedUser} setTicketPopupData={setTicketPopupData}/>
            
            <h3>All Ticket Holders</h3>
            <AttendeeTable event={data.event} className="display-none" />
            <TicketsList tickets={tickets} key={animTrig} setPopupData={setTicketPopupData}/>
          </section>
        )} 



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

    header{
      margin-bottom: 1em;

      h1{
        margin-bottom: 0;
      }
    }
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
      hosts {
        id
        email
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
        event{
          id
          summary
        }
      }
    }
  }
`