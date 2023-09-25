// cred - https://www.youtube.com/watch?v=ecjaXnL2CUs&list=PLdoAUl4PfSFs_9yDIf-HODc6nPteNCww9&index=1
import { useState } from 'react'
import Calendar from 'react-calendar'
import { add, format } from "date-fns";
import { StyledCalendar } from '../../styles/elements/Calendar.styled';

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
