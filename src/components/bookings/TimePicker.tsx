import styles, { active_time_chip } from '@styles/menus/timepicker.module.css'
import { useEffect, useState } from "react"

import { generateTimesArray } from "../../lib/generateTimesArray";

interface iProps {
  times: string[],
  pickedTime:string,
  onTimeCallback: (time:string) => void,
  businessHours: {
    start: string,
    end: string
  }
  // partialDates:DayTimes[],
  // serviceDuration:number,
}

type TimeOpt = {
  value: string,
  label: string,
}

const generatedTimes = generateTimesArray()

// todo just start at 00:00:00 and have 15min incraments. then from there filter out times that don't work.
export function TimePicker({pickedTime, onTimeCallback, times, businessHours }:iProps) {
  
  const [animTrig, setAnimTrig] = useState(0)
  const [currentTimes, setCurrentTimes] = useState(filterOutOfBuisness(generatedTimes, businessHours))

  function onClick(time:string){
    onTimeCallback(time)
  }
  
  useEffect(() => {
    setAnimTrig(animTrig + 1)
    setCurrentTimes(filterOutOfBuisness(generatedTimes, businessHours))
    // console.log({currentTimes});
    // console.log({businessHours});
    // console.log({generatedTimes});
    // return () => 
  }, [times, businessHours])
  

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

          <TimeButton 
            timeobj={timeobj}
            pickedTime={pickedTime}
            onClick={onClick}
            isDisabled={!times.includes(timeobj.value)}
          />

        </li>
      ))}
    </ul>
  )
}


type TimeButtonProps = {
  timeobj:TimeOpt,
  onClick: (time:string) => void,
  pickedTime:string|undefined,
  isDisabled:boolean,
}

function TimeButton({timeobj, isDisabled, onClick, pickedTime}:TimeButtonProps) {

  return(
    <button 
      type='button' 
      className={timeobj.value === pickedTime ? active_time_chip : ''}
      onClick={() => onClick(timeobj.value)}
      disabled={isDisabled}
    >
      {timeobj.label} 
    </button>
  )
}



function filterOutOfBuisness(times:TimeOpt[], businessHours:{start:string,end:string}){

  const openDate = new Date(`2000-01-01T${businessHours.start}`)
  const closedDate = new Date(`2000-01-01T${businessHours.end}`)

  const filteredTimes = times.filter(time => {
    const specificTime = new Date(`2000-01-01T${time.value}`)
    
    if(openDate <= specificTime && specificTime <= closedDate){

      return true
    }

    return false

  })
  
  return filteredTimes

}