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
import TicketPopup, { tTicketPopup } from "../events/TicketPopup"
import { useEffect, useState } from "react"
import { Ticket, User } from "../../lib/types"
import { QUERY_USER_SINGLE } from "./UserSingle"
import TicketsList from "../events/TicketsList"
import styled from "styled-components"


type Props = {
  page?:number,
  user:User,
}

type RSVPData = {
  eventId:string,
  userId:string,
}

const today = new Date()

export function UserEvents({user, page = 1}:Props) {

  const [popupData, setPopupData] = useState<tTicketPopup>()
  const [animTrig, setAnimTrig] = useState(0)
  const [isShown, setIsShown] = useState(false)
  const [pickedEvent, setPickedEvent] = useState()
  const [attendingEventIds, setAttendingEventIds] = useState(user.tickets?.map(t => t.event?.id))
  // const [pickedUser, setPickedUser] = useState('')

  const [deleteTicket, {loading: loadingTicket, error: errorTicket, data: dataTicket}] = useMutation(DELETE_TICKET)
  
  const { loading, error, data } = useQuery(QUERY_EVENTS_ALL, {
    variables: {
      where:{
        start:{
          gte: today.toISOString(),
        }
      },
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

  useEffect(() => {
    console.log(attendingEventIds);
    // return () => 
  }, [attendingEventIds])
  


  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />

  return (
    <StyledUserEvents>

      <TicketPopup 
        popupData={popupData} 
        setTicketPopupData={setPopupData} 
        setAnimTrig={setAnimTrig}
        event={pickedEvent} 
        user={user}
        attendingEventIds={attendingEventIds}
        setAttendingEventIds={setAttendingEventIds}
      />

      <h3>User Tickets </h3>
      <TicketsList tickets={user.tickets} setPopupData={setPopupData} attendingEventIds={attendingEventIds}/>

      <h3> Upcoming Events </h3>
      {/* // todo compare and only show events not attending */}

      <ul>
        {data.events.map((event:any) => {
          if(!attendingEventIds?.includes(event.id)){
           return (
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

                  <button 
                    className="button" 
                    onClick={() => {
                      setPopupData({event: event, user: user})
                      // setPickedEvent(event); 
                      // setIsShown(true); 
                      // @ts-ignore
                      // setAttendingEventIds(prev => [...prev, event.id])
                    }}
                  > 
                    RSVP {user.name}
                  </button>

                </div>

              </StyledEventCard>
            </li>
           )
          } 
        })}
      </ul>

    </StyledUserEvents>
  )
}


const DELETE_TICKET = gql`
  mutation Mutation($where: TicketWhereUniqueInput!) {
    deleteTicket(where: $where) {
      id
    }
  }
`

const StyledUserEvents = styled.div`
  ul{
    list-style: none;
    padding: 0;
  }
`