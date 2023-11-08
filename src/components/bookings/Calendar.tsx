// cred - https://www.youtube.com/watch?v=ecjaXnL2CUs&list=PLdoAUl4PfSFs_9yDIf-HODc6nPteNCww9&index=1
import { RefObject, useState } from 'react'
import Calendar from 'react-calendar'
import styles from '@styles/menus/bookingCalendar.module.scss'

type iProps = {
  blackoutDays: Date[]
  // setValues: any,
  buisnessDays: number[],
  dateRef: RefObject<HTMLInputElement>,
  timeRef: RefObject<HTMLInputElement>,
}

export const CalendarDatePicker = ({ dateRef, timeRef, blackoutDays, buisnessDays,}:iProps) => {

  // const blackoutDates = blackoutStrings.map(date => {return new Date(date).getDate()})
  const [animTrig, setAnimTrig] = useState(0)

  // todo why do i have to convert to string?
  const blackoutStrings = blackoutDays.map(d => d.toString())

  return (
    <div className={styles.calendar_wrap} >

      <Calendar
        minDate={new Date()}
        className={'REACT-CALENDAR p-2'}
        view='month'
        calendarType='US'
        // value={value}
        onClickDay={(date) => {      
          // setValues((prev:any) => ({...prev, date: formatDateToYYYYMMDD(date), timeStart: '', timeEnd: ''}))
          if(!dateRef.current || !timeRef.current) return console.log('no react refs found');
          dateRef.current.value = formatDateToYYYYMMDD(date)
          timeRef.current.value = ''
        }}
        tileDisabled={({date}) => blackoutStrings.includes(date.toString()) || !buisnessDays.includes(date.getDay()) }
      // value={date}
      />

    </div>
  )
}


function formatDateToYYYYMMDD(date:Date) {
  console.log({date});
  
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  // @ts-ignore
  const formattedDate =  date.toLocaleDateString('en-CA', options);
  console.log({formattedDate});
  
  return formattedDate
}