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

// function getDaysInMonth(year:number, month:number){
//   return new Date(year, month + 1, 0).getDate()
// }
function getDaysInMonth(date:Date){
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};


function getDateObj(year:number, month:number, day:number){
  return new Date(year, month, day)
}

function isDatesSameDay(date1:Date, date2:Date){
  
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
    
function sortDays(date:Date){
  const daysInMonth = range(getDaysInMonth(date))
  const index = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  return [...Array(index === 0 ? 6 : index - 0), ...daysInMonth] //? - zero, bug from tut, how do i make this dynamic to the Locale
}
const getSortedDays = (date:Date) => {
  const daysInMonth = range(getDaysInMonth(date));
  const index = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return [...Array(index === 0 ? 6 : index - 1), ...daysInMonth];
};

type Props = {
  initDate?:Date,
  // events: Event[],
}

const today = new Date()
const thisMonth = new Date(today.getFullYear(), today.getMonth())

export function EventsCalendar({initDate = new Date()}:Props) {

  const [currentDate, setCurrentDate] = useState(thisMonth);
  // const [currMonth, setCurrMonth] = useState(initDate.getMonth())
  // const [currYear, setCurrYear] = useState(initDate.getFullYear())
  // const DAYSINAMONTH = getDaysInMonth(currYear, currMonth)

  const { loading, error, data } = useQuery(QUERY_EVENTS_ALL, {
    variables: {
      where: {
        start: {
          gte: new Date(currentDate.getFullYear(), currentDate.getMonth()).toISOString(),
          lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1).toISOString()
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


  function nextMonth(){
    const curDate = currentDate
    const mon = curDate.getMonth();
    if (mon < 11) {
      curDate.setMonth(mon + 1);
    } else {
      curDate.setMonth(0);
      curDate.setFullYear(curDate.getFullYear() + 1);
    }
    setCurrentDate(new Date(curDate));
  };
  
  function prevMonth(){
    const curDate = currentDate
    const mon = curDate.getMonth();
    if (mon > 0) {
      curDate.setMonth(mon - 1);
    } else {
      curDate.setMonth(11);
      curDate.setFullYear(curDate.getFullYear() - 1);
    }
    setCurrentDate(new Date(curDate));
  };

  return (
    <StyledEventsCalender>
      <CalenderHead>
        <button onClick={prevMonth} className="arrow left">
          <MdOutlineKeyboardArrowLeft />
        </button>
        
        <p>{getMonthYear(currentDate)}</p>

        <button onClick={nextMonth} className="arrow right">
          <MdOutlineKeyboardArrowRight />
        </button>
      </CalenderHead>

      <GridSevenCol>
        {DAYS.map((day) => (
          <HeadDays className="nonDRAG">{day}</HeadDays>
        ))}
      </GridSevenCol>

      <GridSevenCol
        fullheight={true}
        is28Days={getDaysInMonth(currentDate) === 28}
        className="calendar-body"
      >
        {sortDays(currentDate).map(day => 
          <StyledDay active={isDatesSameDay(new Date(), getDateObj(currentDate.getFullYear(), currentDate.getMonth(), day))} key={day}>
            <label>{day}</label>
            {events.map((event:Event) => {
              if(isDatesSameDay(getDateObj(currentDate.getFullYear(), currentDate.getMonth(), day), new Date(event.start || '')))
                return <StyledEvent key={event.id}>
                  <Link href={`/events/e/${event.id}`}>
                    {event.summary} @ {datePrettyLocalTime(event.start || '')}
                  </Link>
                </StyledEvent>
              }
            )}
          </StyledDay>
        )}
      </GridSevenCol>

    </StyledEventsCalender>
  )
}

function getMonthYear(date:Date) {
  const d = date.toDateString().split(" ");
  return `${d[1]} ${d[3]}`;
};

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

  .arrow{
    background-color: transparent;
    border: none;
    font-size: 2rem;
    transition: all .3s;

    &:hover{
      color: var(--c-accent);
    }
  }
`

const HeadDays = styled.span`
  text-align: center;
  border: 1px solid;
  /* height: 30px; */
  padding: 5px;
  background: var(--c-3);
  color: white;
`;

const GridSevenCol = styled.div<{fullheight?:boolean, is28Days?:boolean}>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  ${(props) => props.fullheight && `height: calc(100% - 75px);`}
  ${(props) =>
    props.fullheight &&
    `grid-template-rows: repeat(${props.is28Days ? 4 : 5}, 1fr);`}

  & .calendar-cell{
    height: calc(100% - 27px - 40px);
  
  }
`

const DayHead = styled.span`
  text-align: center;
  background: var(--c-3);
  color: var(--c-txt-rev);
  font-size: 1.3rem;
`

const CalendarBody = styled.div`
  height: calc(100% - 27px - 40px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
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