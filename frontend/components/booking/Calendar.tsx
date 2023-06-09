// cred - https://www.youtube.com/watch?v=ecjaXnL2CUs&list=PLdoAUl4PfSFs_9yDIf-HODc6nPteNCww9&index=1
import { useState } from 'react'
import Calendar from 'react-calendar'
import { add, format } from "date-fns";
import styled from 'styled-components';

type iProps = {
  blackoutDays: Date[]
  setValues: any,
  buisnessDays: number[],
  handleBlackoutTimes: any,
}

export const CalendarDatePicker = ({  setValues, blackoutDays, buisnessDays, handleBlackoutTimes}:iProps) => {

  // const blackoutDates = blackoutStrings.map(date => {return new Date(date).getDate()})
  const [animTrig, setAnimTrig] = useState(0)

  // todo why do i have to convert to string?
  const blackoutStrings = blackoutDays.map(d => d.toString())

  return (
    <StyledCalendar>

      <Calendar
        minDate={new Date()}
        className={'REACT-CALENDAR p-2'}
        view='month'
        calendarType='US'
        // value={value}
        onClickDay={(date) => {      
          // handleBlackoutTimes(date)
          setValues((prev:any) => ({...prev, date: format(date, 'yyyy-MM-dd'), timeStart: '', timeEnd: ''}))
          // setAnimTrig(animTrig + 1)
          // getTimes()
        }}
        tileDisabled={({date}) => blackoutStrings.includes(date.toString()) || !buisnessDays.includes(date.getDay()) }
      // value={date}
      />

    </StyledCalendar>
  )
}



const StyledCalendar = styled.div`

  .react-calendar {
    margin: 0 auto;
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
    cursor: default;
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
    cursor: default;
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
    background: var(--c-accent);
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: rgb(238 242 255);
  }
`