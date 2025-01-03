import { daymonthtime } from '@styles/daymonthtime.module.css'

export function DayMonthTime({dateString}:{dateString:string}){

  const date = new Date(dateString);
  const calDate = date.toLocaleDateString('en-CA')
  const month = date.toLocaleString('default', { month: 'short' }).toLocaleUpperCase();
  const day = date.toLocaleString('default', { day: '2-digit' }).toLocaleUpperCase();
  const time = date.toLocaleString('default', { hour: '2-digit', minute: '2-digit',  }).replace('AM', '').replace('PM', '');
  const time24 = date.toLocaleString('default', { hour: '2-digit', minute: '2-digit', hour12: false }).replace('AM', '').replace('PM', '');
  const ampm = date.toLocaleString('en-US', { hour12: true, hour: '2-digit' }).slice(-2).toLocaleLowerCase();



  return(
    <div className={daymonthtime} >
      <time dateTime={calDate} className="date">
        <span className="month"> {month} </span>
        <span className="day"> {day} </span>
      </time>
      <time dateTime={time24} className="time">
        <span> {time} </span>
        <small> {ampm} </small>
      </time>
    </div>
  )
}