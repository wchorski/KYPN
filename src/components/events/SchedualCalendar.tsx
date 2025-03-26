import type { Booking, Event as TEvent } from "@ks/types";
import { datePrettyLocalTime } from "@lib/dateFormatter";
import styles from '@styles/events/calendar.module.scss'
import Link from "next/link";
import { BsFillBookmarkFill, BsFillTicketPerforatedFill } from "react-icons/bs"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

type Props = {
  date:string,
  events:TEvent[]|undefined,
  bookings:Booking[]|undefined,
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function SchedualCalendar ({ date, events, bookings }:Props) {

  function nextMonth(date:string,){
    const curDate = new Date(date)
    const firstOfMonth = new Date(curDate.getFullYear(), curDate.getMonth())
    firstOfMonth.setMonth(curDate.getMonth() + 1);

    return firstOfMonth.toDateString()
  }

  function prevMonth(date:string,){
    const curDate = new Date(date)
    const firstOfMonth = new Date(curDate.getFullYear(), curDate.getMonth())
    firstOfMonth.setMonth(curDate.getMonth() - 1);

    return firstOfMonth.toDateString()
  }

  return (
    <div
      className={styles.hide_on_mobile} 
    >

      <header className={styles.header}>
        <Link 
          href={`?${
            new URLSearchParams({
              date: prevMonth(date)
            })
          }`} 
          className="arrow left"
        >
          <MdOutlineKeyboardArrowLeft />
        </Link>
        
        <p className="month-label">{getMonthYear(date)}</p>

        <Link  
          href={`?${
            new URLSearchParams({
              date: nextMonth(date)
            })
          }`} 
          className="arrow right"
        >
          <MdOutlineKeyboardArrowRight />
        </Link>
      </header>

      <div className={styles.grid_7} >
        {DAYS ? DAYS.map((day, i) => (
          <span key={i} className={[styles.head_day, 'nonDRAG'].join(' ')} >{day}</span>
        )) : (
          <span  className={[styles.head_day, 'nonDRAG'].join(' ')} > YOU SHOULDNT SEE ME EVER </span>
        )}
      </div>

      <div 
        className={[
          'calendar-body', 
          styles.grid_7, 
          (getDaysInMonth(date) === 28) ? styles.is28Days : styles.isNot28Days].join(' ')
        }
      >
        {sortDays(date).map((day, i) => 
          <span 
            className={[
              styles.cell_day,
              
            ].join(' ')
            }
            key={i}
          >
            <label
              className={
                (isDatesSameDay(new Date(), getDateObj(new Date(date).getFullYear(), new Date(date).getMonth(), day))) 
                ? styles.cell_active : ''
              } 
            >
              {day}
            </label>

            {events?.map((event) => <SchedualChip date={date} day={day} data={event} key={event.id} /> )}
            {bookings?.map((book) => <SchedualChip date={date} day={day} data={book} key={book.id} /> )}
          </span>
        )}
      </div>
    </div>
  )
}

type TSchedualChip = {
  date:string,
  day:number,
  data:TEvent|Booking,
}

function SchedualChip({date, day, data}:TSchedualChip){

  function isBooking(data:any): data is Booking {
    return true
  }
  function isEvent(data:any): data is Event {
    return true
  }

  const hrefPre = (() => {
    switch (data.typeof) {
    case ('booking'):
      return 'bookings'
    case ('event'):
      return 'events'
  
    default:
      throw Error('!!! SchedualChip: no type for data');
    }
  })()

  const icon = (() => {
    switch (true) {
      case (data.typeof === 'booking'):
        return <BsFillBookmarkFill />
      case (data.typeof === 'event'):
        return <BsFillTicketPerforatedFill />
    
      default:
        throw Error('!!! SchedualChip: no type for data');
    }
  })()

  let style = [styles.event_chip]
  if(data.typeof === 'booking') style.push(styles.booking)

  if(isDatesSameDay(getDateObj(new Date(date).getFullYear(), new Date(date).getMonth(), day), new Date(data.start || '')))
    return (
      <span 
        className={style.join(' ')}
        key={data.id}
      >
        <Link href={`/${hrefPre}/${data.id}`} >
          {icon} {'  '}
          {data.summary}
          <br /> 
          @ {datePrettyLocalTime(data.start || '')}
        </Link>
      </span>
    )
  }


function getMonthYear(date:string) {
  const curDate = new Date(date)
  const d = curDate.toDateString().split(" ");

  return `${d[1]} ${d[3]}`;
};

function getDaysInMonth(date:string){

  const dateObj = new Date(date)

  return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
};

function sortDays(date:string){

  const dateObj = new Date(date)

  const daysInMonth = range(getDaysInMonth(date))
  const index = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).getDay()
  return [...Array(index === 0 ? 6 : index - 0), ...daysInMonth] //? - zero, bug from tut, how do i make this dynamic to the Locale
}

function range(end:number){
  const {result} = Array.from({length: end}).reduce(({result, current}) => ({
    result: [...result, current],
    current: current + 1
  }), {result: [], current: 1})

  return result;
}

function isDatesSameDay(date1:Date, date2:Date){

  // const date1Obj = new Date(date1)
  // const date2Obj = new Date(date2)
  
  return date1.getFullYear() === date2.getFullYear() 
  && date1.getMonth() === date2.getMonth()
  && date1.getDate() === date2.getDate()
}

function getDateObj(year:number, month:number, day:number){
  return new Date(year, month, day)
}