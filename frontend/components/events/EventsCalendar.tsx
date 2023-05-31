// cred - JS Stack - https://www.youtube.com/watch?v=gcRZ8Ysgquc
import { useState } from "react"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import styled from "styled-components"
import { Event } from "../../lib/types"
import { datePrettyLocalTime } from "../../lib/dateFormatter"
import { QueryLoading } from "../menus/QueryLoading"
import { QueryError } from "../menus/QueryError"
import { gql, useQuery } from "@apollo/client"
import Link from "next/link"

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const range = (end:number) => {
  const {result} = Array.from({length: end}).reduce(({result, current}) => ({
    result: [...result, current],
    current: current + 1
  }), {result: [], current: 1})

  return result;
}

function getDaysInMonth(year:number, month:number){
  return new Date(year, month + 1, 0).getDate()
}

function getSortedDays(year:number, month:number){
  const dayIndex = new Date(year, month, 1).getDay()
  return [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)]
}

function getDateObj(year:number, month:number, day:number){
  return new Date(year, month, day)
}

function isDatesTheSame(date1:Date, date2:Date){

  return date1.getFullYear() === date2.getFullYear() 
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate()
}
// ? other way to write above code
// const range = (end) => {
//   let result =[1];
//   for(let i = 2; i <= end; i++){
//       result.push(i)
//   }
//   return result
// }

type Props = {
  initDate?:Date,
  // events: Event[],
}

// TODO why do days of the week keep getting shuffled on month move

export function EventsCalendar({initDate = new Date()}:Props) {

  const [currMonth, setCurrMonth] = useState(initDate.getMonth())
  const [currYear, setCurrYear] = useState(initDate.getFullYear())
  const DAYSINAMONTH = getDaysInMonth(currYear, currMonth)

  const { loading, error, data } = useQuery(QUERY_EVENTS_ALL, {
    variables: {
      where: {
        start: {
          gte: new Date(currYear, currMonth).toISOString(),
          lt: new Date(currYear, currMonth + 1).toISOString()
        }
      },
      orderBy: [
        {
          start: 'desc'
        }
      ]
    },
  })

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />

  const {events} = data


  function prevMonth(){
    if(currMonth > 0){
      setCurrMonth(prev => prev - 1)
    } else {
      setCurrMonth(11)
      setCurrYear(prev => prev - 1)
    }
  }

  function nextMonth(){
    if(currMonth < 11){
      setCurrMonth(prev => prev + 1)
    } else {
      setCurrMonth(0)
      setCurrYear(prev => prev + 1)
    }
  }

  return (
    <StyledEventsCalender>
      <CalenderHead>
        <button onClick={prevMonth}>
          <MdOutlineKeyboardArrowLeft />
        </button>
        
        <p>{MONTHS[currMonth]} {currYear}</p>

        <button onClick={nextMonth}>
          <MdOutlineKeyboardArrowRight />
        </button>
      </CalenderHead>
      <GridSevenCol>
        {getSortedDays(currYear, currMonth).map(day => (
          <DayHead key={day}>{day}</DayHead>
        ))}
      </GridSevenCol>

      <CalendarBody 
        fourCol={DAYSINAMONTH === 28}
      >
        {range(DAYSINAMONTH).map(day => 
          <StyledDay active={isDatesTheSame(new Date(), getDateObj(currYear, currMonth, day))} key={day}>
            <label>{day}</label>
            {events.map((event:Event) => {
              if(isDatesTheSame(getDateObj(currYear, currMonth, day), new Date(event.start || '')))
                return <StyledEvent key={event.id}>
                  <Link href={`/events/e/${event.id}`}>
                    {event.summary} @ {datePrettyLocalTime(event.start || '')}
                  </Link>
                </StyledEvent>
              }
            )}
          </StyledDay>
        )}
      </CalendarBody>
    </StyledEventsCalender>
  )
}

export const QUERY_EVENTS_ALL = gql`
  query Events($where: EventWhereInput!, $orderBy: [EventOrderByInput!]!) {
    eventsCount
    events(where: $where, orderBy: $orderBy) {
      start
      status
      end
      id
      location {
        name
        id
      }
      price
      seats
      summary
      ticketsCount
    }
  }
`

const StyledEventsCalender = styled.div`
  margin-bottom: 1em;
`

const CalenderHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
`

const GridSevenCol = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

const DayHead = styled.span`
  text-align: center;
  background: var(--c-3);
  color: var(--c-txt-rev);
  font-size: 1.3rem;
`

const CalendarBody = styled.div<{fourCol:boolean}>`
  height: calc(100% - 27px - 40px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  /* grid-template-rows: repeat(${p => p.fourCol ? 4 : 5}, 1fr); */
`

const StyledDay = styled.span<{active:boolean}>`
  border: solid 1px var(--c-desaturated);
  text-align: right;
  padding: 5px;
  min-height: 5em;

  label{
    padding: 5px;
    border-radius: 50%;
    ${p => p.active && `background-color: var(--c-3); color: white;`}
  }
`

const StyledEvent = styled.span`
  display: grid;

  a{
    text-align: left;
    margin-bottom: 5px;
    background-color: var(--c-3);
    text-decoration: none;
    color: var(--c-txt-rev);
    padding: 0px 8px;
    border-radius: var(--br-sharp);
    font-size: small;
  }
`