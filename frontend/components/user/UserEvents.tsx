import { useQuery } from "@apollo/client"
import { perPage } from "../../config"
import { QueryError } from "../menus/QueryError"
import { QueryLoading } from "../menus/QueryLoading"
import { QUERY_EVENTS_ALL } from "../events/EventList"
import { ImageDynamic } from "../elements/ImageDynamic"
import { MdLocationOn } from "react-icons/md"
import { IoMdTime } from "react-icons/io"
import { datePrettyLocalDayShort, datePrettyLocalTime } from "../../lib/dateFormatter"
import Link from "next/link"
import { StyledEventCard } from "../events/EventCard"
import TicketPopup from "../events/TicketPopup"
import { useState } from "react"
import { User } from "../../lib/types"


type Props = {
  page?:number,
  user:User,
}

type RSVPData = {
  eventId:string,
  userId:string,
}

export function UserEvents({user, page = 1}:Props) {

  const [isShown, setIsShown] = useState(false)
  const [pickedEvent, setPickedEvent] = useState<Event|undefined>(undefined)
  const [ticketIds, setTicketIds] = useState(user.tickets.map(t => t.event.id))
  // const [pickedUser, setPickedUser] = useState('')
  
  const { loading, error, data } = useQuery(QUERY_EVENTS_ALL, {
    variables: {
      // skip: page * perPage - perPage,
      // take: perPage,
      orderBy: [
        {
          start: 'desc'
        }
      ]
    },
  })

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />

  return (
    <div>

      <TicketPopup setIsShown={setIsShown} isShown={isShown} event={pickedEvent} user={user}/>

      <h2>Admin Events Quick Edit</h2>

      <ul>
        {data.events.map((event:any) => (
          <li key={event.id}>
            <StyledEventCard>
              <div>
                <ImageDynamic photoIn={event.photo}/>
              </div>

              <div>
                <time dateTime={event.start} className="date-short"> 
                  {datePrettyLocalDayShort(event.start)} 
                </time>
              </div>

              <Link href={`/events/e/${event.id}`} className="details">
                <h4> {event.summary} </h4>

                <time dateTime={event.start}> 
                  <IoMdTime />
                  {/* {datePrettyLocalDay(start)}  */}
                  {/* @  */}
                  {datePrettyLocalTime(event.start)}
                </time>

                {location && (
                  <address>
                    <MdLocationOn />
                    {event.location?.name} <br />
                    {/* {address.street} <br /> */}
                    {/* {address.town} <br /> */}
                    {/* {address.country} <br /> */}
                  </address>
                )}
              </Link>

              <div className="actions-cont"> 
                {/* <label>
                  <input type="checkbox"/>
                  RSVP
                </label> */}

                {ticketIds.includes(event.id) ? (
                  <button> Remove </button>
                ) : (
                  <button 
                    className="button" 
                    onClick={() => {setPickedEvent(event); setIsShown(true)}}
                  > 
                    RSVP 
                  </button>
                )}
                
              </div>

            </StyledEventCard>
          </li>
        ))}
      </ul>
    </div>
  )
}
