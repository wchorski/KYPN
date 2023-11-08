import { RefObject, useEffect, useState } from "react"
import styles from '@styles/menus/timepicker.module.scss'
import { generateTimesArray } from "../../lib/generateTimesArray";
import { DayTimes } from "@ks/types";

interface iProps {
  timeRef: RefObject<HTMLInputElement>,
  times: string[],
  buisnessHours: {
    start: string,
    end: string
  }
  partialDates:DayTimes[],
  serviceDuration:number,
}

type TimeOpt = {
  value: string,
  label: string,
}

const generatedTimes = generateTimesArray()

// todo just start at 00:00:00 and have 15min incraments. then from there filter out times that don't work.
export function TimePicker({timeRef, times, buisnessHours, partialDates, serviceDuration}:iProps) {
  // console.log({times});
  
  const [animTrig, setAnimTrig] = useState(0)
  const [currentTimes, setCurrentTimes] = useState(filterOutOfBuisness(generatedTimes, buisnessHours))
  // console.log({generatedTimes});
  
  // const activeDay = partialDates.filter(d => isSameCalendarDay(d.day, new Date(values.date)))
  // const activeTimes = activeDay.map(d => d.times)
  // console.log({activeTimes});
  // todo could just use 'activeTimes' to check if button is disabled
  


  useEffect(() => {
    setAnimTrig(animTrig + 1)
    // console.log({currentTimes});
    // console.log({buisnessHours});
    // console.log({generatedTimes});
    
    // return () => 
  }, [times])

  const listitemStyle = (i:number) => ({
    animationDelay: `calc(${i} * 0.005s)` ,
  }) 

  return (
    <ul 
      className={styles.timepickerlist} 
      key={animTrig}
    >
      {currentTimes.map((timeobj:TimeOpt, i) => (
        <li key={`time-${i}`} style={listitemStyle(i)} >

          <button 
            type='button' className={timeobj.value === timeRef.current?.value ? 'active' : ''}
            onClick={() => {
              if(!timeRef.current) return console.log('no react refs found');
              timeRef.current.value = timeobj.value
            }} 

            // disable any time buttons that could overlap with start or end of a gig or avail 
            disabled={times.includes(timeobj.value) ? false : true}

          >
            {timeobj.label}
          </button>

        </li>
      ))}
    </ul>
  )
}


function filterOutOfBuisness(times:TimeOpt[], buisnessHours:{start:string,end:string}){

  const openDate = new Date(`2000-01-01T${buisnessHours.start}`)
  const closedDate = new Date(`2000-01-01T${buisnessHours.end}`)
  // todo also remove from times ARRAY

  
  const filteredTimes = times.filter(time => {
    const specificTime = new Date(`2000-01-01T${time.value}`)
    
    
    if(openDate <= specificTime && specificTime <= closedDate){

      return true
    }

    return false

  })

  // console.log({filteredTimes});
  
  return filteredTimes

}