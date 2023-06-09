import { useEffect, useState } from "react"
import styled from "styled-components"
import { generateTimesArray } from "../../lib/generateTimesArray";
import { DayTimes } from "../../lib/types";
import { isSameCalendarDay } from "../../lib/dateCheckCal";

interface iProps {
  values: any | undefined,
  setValues: any,
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
export function TimePicker({values, setValues, times, buisnessHours, partialDates, serviceDuration}:iProps) {
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
    <StyledTimePicker className={values['date'] ? 'open' : ''} key={animTrig}>
      {currentTimes.map((timeobj:TimeOpt, i) => (
        <li key={`time-${i}`} style={listitemStyle(i)} >

          <button 
            type='button' className={timeobj.value === values.timeStart ? 'active' : ''}
            onClick={() => setValues((prev:any) => ({...prev, timeStart: timeobj.value}))} 

            // disable any time buttons that could overlap with start or end of a gig or avail 
            disabled={times.includes(timeobj.value) ? false : true}

          >
            {timeobj.label}
          </button>

        </li>
      ))}
    </StyledTimePicker>
  )
}

const StyledTimePicker = styled.ul`
  column-count: 3;
  min-height: 11em;
  margin: 0;
  padding: 0;
  list-style: none;
  /* display: flex; */
  /* flex-wrap: wrap; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: .1em;
  /* flex-direction: column; */

  li{
    /* width: 6em; */
    animation-duration: .3s;
    animation-name: reveal;
    animation-timing-function: ease;
  }
  /* li:nth-child(n+1):nth-child(-n+4),
  li:nth-child(8n+1),
  li:nth-child(8n+2),
  li:nth-child(8n+3),
  li:nth-child(8n+4) {
    border-bottom: solid #959595 1px;
  } */

  button{
    border-radius: 50px;
    min-width: 5rem;
    border: solid 2px var(--c-txt);
    
    &:hover, &focus{
      border: solid 2px var(--c-accent);
      
    }
  }


  .active{
    background-color: var(--c-accent);
    border: solid 2px var(--c-accent);
  }

  @keyframes reveal {
    0% { 
      transform: translateX(-3px);
      opacity: 0.4;
    }
    100% { 
      transform: translateX(0px);
      opacity: 1;
    }
  }
`

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