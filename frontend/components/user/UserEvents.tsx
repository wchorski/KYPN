import { useQuery, gql, useMutation } from "@apollo/client"
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
import { Ticket, User } from "../../lib/types"
import { QUERY_USER_SINGLE } from "./UserSingle"


type Props = {
  page?:number,
  user:User,
}

type RSVPData = {
  eventId:string,
  userId:string,
}

export function UserEvents({user, page = 1}:Props) {

  const [animTrig, setAnimTrig] = useState(0)
  const [isShown, setIsShown] = useState(false)
  const [pickedEvent, setPickedEvent] = useState()
  const [ticketIds, setTicketIds] = useState(user.tickets.map(t => t.event.id))
  // const [pickedUser, setPickedUser] = useState('')

  const [deleteTicket, {loading: loadingTicket, error: errorTicket, data: dataTicket}] = useMutation(DELETE_TICKET)
  
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

  async function handleTicketDelete(id:string){
    console.log({id});
    

    try {
      const res = await deleteTicket({
        variables: {
          where: {
            id: id
          }
        },
        refetchQueries:  [{ query: QUERY_USER_SINGLE, variables: { where: { id: user.id }}, }],
        // update: handleUpdate,
      })

      setAnimTrig(animTrig + 1)
      
    } catch (error) {
      console.warn('ticket delete error: ', error)
    }
  }

  function handleUpdate(cache:any, payload:any) {
    cache.evict(cache.identify(payload.data.deleteTicket))
  }

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />

  return (
    <div>

      <TicketPopup setIsShown={setIsShown} isShown={isShown} event={pickedEvent} user={user}/>

      <h2>Admin Events Quick Edit</h2>

      <h3>User Tickets </h3>

      <ul key={animTrig}>
        {user.tickets.map((tic:Ticket) => (
          <li key={tic.id}>
            <h4>{tic?.event?.summary}</h4>
            <button onClick={() => handleTicketDelete(tic.id)} disabled={loadingTicket ? true : false}>
              remove
            </button>
          </li>
        ))}
      </ul>

      {/* // todo compare and only show events not attending */}
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
                  <p> 
                    Attending 
                  </p>
                ) : (
                  <button 
                    className="button" 
                    onClick={() => {setPickedEvent(event); setIsShown(true); setTicketIds(prev => [...prev, event.id])}}
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


const DELETE_TICKET = gql`
  mutation Mutation($where: TicketWhereUniqueInput!) {
    deleteTicket(where: $where) {
      id
    }
  }
`
