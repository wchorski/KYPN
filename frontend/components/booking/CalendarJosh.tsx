// cred - https://www.youtube.com/watch?v=ecjaXnL2CUs&list=PLdoAUl4PfSFs_9yDIf-HODc6nPteNCww9&index=1
import { FC, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { add, format } from "date-fns";
import styled from 'styled-components';
// import { DateType } from '../../pages/booking/BookingForm';

// interface DateType {
//   justDate: Date | null,
//   dateTime: Date | null,
// }
interface indexProps {
  date: string | undefined,
  setDatePicked: any,
  times: string[] | undefined,
  setTimes: any,
  timePicked: string | undefined,
  setTimePicked: any,
}

// interface DateType {
//   justDate: Date | null,
//   dateTime: Date | null,
// }

const BUISNESS_HOURS_START = Number(process.env.NEXT_PUBLIC_BUISNESS_HOURS_START)
const BUISNESS_HOURS_END = Number(process.env.NEXT_PUBLIC_BUISNESS_HOURS_END)
const BUISNESS_MINUTES_INTERVAL = Number(process.env.NEXT_PUBLIC_BUISNESS_MINUTES_INTERVAL)

export const CalendarJosh: FC<indexProps> = ({ date, setDatePicked, times, setTimePicked, setTimes, timePicked }) => {

  // const [date, setDatePicked] = useState<DateType>({
  //   justDate: null,
  //   dateTime: null,
  // })
  const [animTrig, setAnimTrig] = useState(0)

  // function getTimes() {
  //   if (!date) return
  //   if (!BUISNESS_MINUTES_INTERVAL || !BUISNESS_HOURS_END || !BUISNESS_HOURS_START) return console.error('SET ENV VARIABLES');

  //   const { justDate } = date

  //   const bookStart = add(justDate, { hours: 9 })
  //   const bookEnd = add(justDate, { hours: 12 })
  //   const interval = BUISNESS_MINUTES_INTERVAL

  //   const times = []
  //   for (let i = bookStart; i <= bookEnd; i = add(i, { minutes: interval })) {
  //     times.push(i)
  //   }

  //   return times
  // }

  // const times = getTimes()

  // useEffect(() => {
  //   console.log(date);
  //   if (!date) return
  //   // console.log(format(date, 'yyyy-MM-dd'));


  //   // return () => 
  // }, [date])

  function getTimes() {
    setTimes([
      '09:00',
      '09:30',
      '10:01',
      '10:50',
      '13:33',
      '17:12',
    ])
  }

  function handleTimeFormat(time: string) {
    const newDate = new Date()
    const hoursMinutes = time.split(':')

    newDate.setHours(Number(hoursMinutes[0]), Number(hoursMinutes[1]))

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    // @ts-ignore
    const timeString = newDate.toLocaleTimeString('en-US', options);
    const lowCaps = timeString.replace('AM', 'am').replace('PM', 'pm')

    return lowCaps
  }


  return (
    <StyledCalendar>

      <Calendar
        minDate={new Date()}
        className={'REACT-CALENDAR p-2'}
        view='month'
        onClickDay={(date) => {
          setDatePicked(format(date, 'yyyy-MM-dd'))
          setAnimTrig(animTrig + 1)
          getTimes()
        }}
      // value={date}
      />


      <StyledTimePicker key={animTrig} className={date ? 'open' : ''}>
        {times?.map((time, i) => (
          <li key={`time-${i}`}>
            <button type='button' onClick={() => setTimePicked(time)} className={time === timePicked ? 'active' : ''}>
              {handleTimeFormat(time)}
            </button>
          </li>
        ))}
      </StyledTimePicker>


    </StyledCalendar>
  )
}

const StyledTimePicker = styled.ul`
  transition: all .3s;
  animation: reveal  1s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  .active{
    background-color: var(--c-1);
  }

  @keyframes reveal {
    0% { 
      opacity: .2;
    }
    100% { 
      opacity: 1;
    }
  }
`

const StyledCalendar = styled.div`

  .react-calendar {
    width: 450px;
    max-width: 100%;
    background: white;
    border-radius: 15px;
    border: 1px solid rgb(209 213 219);
    font-family: Manrope, Helvetica, sans-serif;
    line-height: 1.125em;
    box-shadow: #0000007e 2px 2px 6px;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  /* Custom Navigation Styles */
  @media screen and (max-width: 500px) {
    .react-calendar__navigation__prev2-button,
    .react-calendar__navigation__prev-button {
      display: none;
    }
    .react-calendar__navigation__label {
      padding-left: 1rem;
      text-align: left;
    }
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:disabled {
    visibility: hidden;
    background-color: #f0f0f0;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__month-view__weekdays {
    color: var(--c-3);
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.8em;
  }
  /* Each day should be round when hovered */
  .react-calendar__month-view__days__day {
    padding: 5px;
    background-clip: content-box !important;
    border-radius: 15px !important;
  }

  .react-calendar__navigation__label__labelText {
    font-weight: 500;
    font-size: 1.05em;
  }
  .react-calendar__navigation__label {
    pointer-events: none;
  }

  .react-calendar__navigation__arrow {
    background-color: #fff;
    padding: 7px;
    background-clip: content-box !important;
    border-radius: 50px;
    font-size: 1.25em;
  }
  .react-calendar__navigation__arrow:hover {
    background-color: rgb(107 114 128);
  }

  /* If you do not wish to show weekends */

  /* 
  .react-calendar__month-view__days > .react-calendar__tile,
  .react-calendar__month-view__weekdays__weekday {
    flex-basis: 20% !important;
    max-width: 20% !important;
  } 

  .react-calendar__month-view__weekdays__weekday:nth-child(6),
  .react-calendar__month-view__weekdays__weekday:nth-child(7) {
    display: none !important;
  } 

  .react-calendar__month-view__days__day--weekend {
    display: none !important;
  } 
  */

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #b3b3b3;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    aspect-ratio: 1/1;
    max-width: 100%;
    background: none;
    text-align: center;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: rgba(107 114 128 / 18%);
    text-decoration: line-through;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: rgb(238 242 255);
  }
  .react-calendar__tile--now {
    border-radius: 15px;
    border: 2px solid lightgray !important;
    border-bottom: 2px solid var(--c-3) !important;
    color: var(--c-3);
    position: relative;

    /* &::after{
      content: "*";
      position: absolute;
      top: 20%;
      right: 40%;
    } */
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background-color: rgb(238 242 255);
  }
  .react-calendar__tile--hasActive {
    background: #76ff8d;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #b6cb59;
  }
  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: var(--c-1);
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: rgb(238 242 255);
  }
`