// cred - https://www.youtube.com/watch?v=ecjaXnL2CUs&list=PLdoAUl4PfSFs_9yDIf-HODc6nPteNCww9&index=1
import styles from '@styles/menus/bookingcalendar.module.scss'
import { useState } from 'react'
import Calendar from 'react-calendar'

type iProps = {
  blackoutDays: Date[]
  // setValues: any,
  buisnessDays: number[],
  onDateCallback: (date:string) => void,
  // timeRef: RefObject<HTMLInputElement>,
}

export const CalendarDatePicker = ({ onDateCallback, blackoutDays, buisnessDays = [1,2,3,4,5,6,7,0]}:iProps) => {

  // const blackoutDates = blackoutStrings.map(date => {return new Date(date).getDate()})
  const [animTrig, setAnimTrig] = useState(0)

  // todo why do i have to convert to string?
  const blackoutStrings = blackoutDays.map(d => d.toString())

  // useEffect(() => {
  //   setAnimTrig(prev => prev + 1)
  
  //   // return () => 
  // }, [pickedDate])
  

  return (
    <div 
      // key={animTrig}
      className={styles.calendar_wrap} 
    >

      <Calendar
        minDate={new Date()}
        className={'REACT-CALENDAR p-2'}
        view='month'
        calendarType='gregory'
        // value={value}
        onClickDay={(date) => {      
          // setValues((prev:any) => ({...prev, date: formatDateToYYYYMMDD(date), timeStart: '', timeEnd: ''}))
          onDateCallback(formatDateToYYYYMMDD(date))
        }}
        tileDisabled={({date}) => blackoutStrings.includes(date.toString()) || !buisnessDays.includes(date.getDay()) }
      // value={date}
      />

    </div>
  )
}


function formatDateToYYYYMMDD(date:Date) {
  
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  // @ts-ignore
  const formattedDate =  date.toLocaleDateString('en-CA', options);
  
  return formattedDate
}