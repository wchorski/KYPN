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
import { SearchUserTicket } from "../tickets/SearchUserTicket"
import { datePrettyLocalDay, datePrettyLocalTime } from "../../lib/dateFormatter"
import { RiFileEditFill } from "react-icons/ri"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
import Link from "next/link"
import { AttendeeTable } from "./AttendeeTable"
import { useUser } from "../menus/Session"
import { PopupAnim } from "../menus/PopupAnim"
import { TicketsForm } from "../tickets/TicketsForm"
import { AddTicketButton } from "../tickets/AddTicketButton"
import {AddToCalendarButton} from'add-to-calendar-button-react';
import Head  from "next/head"
import { BlockRenderer } from "../blocks/BlocksRenderer"

type tPopupData = {

}|any


// const now = new Date()

const SITE_URI = process.env.NEXT_PUBLIC_SITE_URI || 'no_url'

export default function EventSingle({id}:{id:string}) {

  const session = useUser()
  
  const [popupData, setPopupData] = useState<tPopupData>()
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

  console.log(data.event)
  
  const {image, summary, excerpt, description, tickets = [], price, start, end, seats, hosts, location, categories, tags}:Event = data?.event
  
  return (<>
    <Head>
      <title> {summary} </title>
      <meta name="description"        content={excerpt} />
      <meta name='keywords'           content={tags?.map(tag => tag.name).join(', ')} />
      <meta name="author"             content={hosts ? hosts[0]?.name || '' : ''} />
      <meta property="og:title"       content={summary} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:image"       content={image} />
      <meta property="og:url"         content={SITE_URI + '/events/e/' + id} />
      <meta property="og:type"        content="article" />
    </Head>
    
    <StyledEventSingle className="pad">

      <TicketPopup 
        popupData={ticketPopupData}
        setTicketPopupData={setTicketPopupData}
        setIsPopup={setIsPopup} 
        isPopup={isPopup}   
        event={data?.event} 
        user={pickedUser}
        setAnimTrig={setAnimTrig}
        
      />

      <PopupAnim isPopup={isPopup} setIsPopup={setIsPopup}>
        <TicketsForm event={data?.event} holderId={session?.id} price={price}/>
      </PopupAnim>

      {/* <aside>
        <div className="cont">
          <picture>
            <ImageDynamic photoIn={image} />
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
      </aside> */}

      <article>
        <header>
          <div className="container">
          <picture>
            <ImageDynamic photoIn={image} />
          </picture>

          <h1>{summary}</h1>
          <ul className="categories">
            {categories?.map(cat => (
              <li key={cat.id}>
                <Link href={`/blogs/search?categories=${cat.id}`} > {cat.name} </Link>
              </li>
            ))}
          </ul>

          <AddToCalendarButton
            name={summary}
            startDate={new Date(start || '').toLocaleDateString('en-Ca')}
            startTime={new Date(start || '').toLocaleTimeString('en-CA', {hour12:false })}
            endDate={new Date(end || '').toLocaleDateString('en-Ca')}
            endTime={new Date(end || '').toLocaleTimeString('en-CA', {hour12:false })}
            timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
            options={['Apple','Google','Yahoo','iCal']}
          />

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
          </div>
        </header>

        <div className="content">

          <div className="card call-to-action">
            
            <div className="info-cont">
              <strong>Purchase Ticket</strong> 
              <br/>
              <small>sub text</small> 
            </div>


            <AddTicketButton 
              setIsPopup={setIsPopup}
              price={price} 
              date={start} 
            />

            {/* <button onClick={() => setPopupData({id: '123'})} className="ticket"> 
              {price && price > 0 ? (
                <span>{moneyFormatter(price)} per Ticket</span>
              ) : (
                <span> Free </span>
              )}
            </button> */}

          </div>

          <h2>About</h2>
          <div className='description-wrap'>
            <BlockRenderer document={description.document} />
          </div>

          <hr />
          <ul className="tags">
            {tags?.map(tag => (
              <li key={tag.id}>
                <Link href={`/blogs/search?tags=${tag.id}`} > {tag.name} </Link>
              </li>
            ))}
          </ul>

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
              <div style={{position: 'relative'}}>
                <SearchUserTicket  eventId={id} setIsPopup={setIsPopup} setPickedUser={setPickedUser} setTicketPopupData={setTicketPopupData}/>
              </div>
              
              <h3>All Ticket Holders</h3>
              <AttendeeTable event={data.event} className="display-none" />
              <TicketsList tickets={tickets} key={animTrig} setPopupData={setTicketPopupData}/>
            </section>
          )} 
        </div>




      </article>
    </StyledEventSingle>
  </>)
}

const StyledEventSingle = styled.section`
  
  /* display: flex; */

  /* aside{
    margin-right: 1em;
    flex: 1 6 20%;

    .cont{
      position: sticky;
      top: 2em;
      float: left;

    }
  } */

  picture{
    width: 300px; /* Adjust the width of the container as per your requirement */
    height: 300px; /* Adjust the height of the container as per your requirement */
    border: 1px solid black; /* Optional: Add border for visualization */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img{
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  article{
    display: flex;
    gap: 1em;

    header{
      margin-bottom: 1em;
      flex: 1 6 20%;

      .container{
        position: sticky;
        top: 2em;
        float: left;
      }

      h1{
        margin-bottom: 0;
      }
    }

    .content{
      flex: 3 1 80%;

      margin-top: 2rem;
      
    }
    
  }

  button.ticket{
    span{
      margin-right: .4em;
    }
  }

  @media (max-width: 700px){
    article{
      flex-direction: column;
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
      image
      description {
        document(hydrateRelationships: true)
      }
      excerpt
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