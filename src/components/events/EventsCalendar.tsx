import Link from "next/link";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import styles from '@styles/events/calendar.module.scss'
import { Event } from "@ks/types";
import { datePrettyLocalTime } from "@lib/dateFormatter";

type Props = {
  date:string,
  events:Event[]|undefined,
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export async function EventsCalendar ({ date, events }:Props) {

  function nextMonth(date:string,){
    const curDate = new Date(date)
    const mon = curDate.getMonth();
    curDate.setMonth(mon + 1);

    return curDate.toDateString()
  }

  function prevMonth(date:string,){
    const curDate = new Date(date)
    const mon = curDate.getMonth();
    curDate.setMonth(mon - 1);

    return curDate.toDateString()
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

            {events?.map((event:Event) => {
              if(isDatesSameDay(getDateObj(new Date(date).getFullYear(), new Date(date).getMonth(), day), new Date(event.start || '')))
                return (
                  <span 
                    className={styles.event_chip}
                    key={event.id}
                  >
                    <Link href={`/events/${event.id}`} className="event-button">
                      {event.summary}
                      <br /> 
                      @ {datePrettyLocalTime(event.start || '')}
                    </Link>
                  </span>
                )
              }
            )}
          </span>
        )}
      </div>
    </div>
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