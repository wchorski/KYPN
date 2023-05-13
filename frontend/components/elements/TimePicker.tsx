import { useEffect, useState } from "react"
import styled from "styled-components"
import { generateTimesArray } from "../../lib/generateTimesArray";

interface iProps {
  values: any | undefined,
  setValues: any,
  times: string[],
  buisnessHours: {
    start: string,
    end: string
  }
  serviceDuration:number,
}

type TimeOpt = {
  value: string,
  label: string,
}


const generatedTimeStrings = generateTimesArray().map(t => t.value)
const generatedTimes = generateTimesArray()

// todo just start at 00:00:00 and have 15min incraments. then from there filter out times that don't work.
export function TimePicker({values, setValues, times, buisnessHours, serviceDuration}:iProps) {
  

  // console.log('time picker input times', {times});
  const [animTrig, setAnimTrig] = useState(0)
  const [currentTimes, setCurrentTimes] = useState(filterOutOfBuisness(generatedTimes, buisnessHours))


  useEffect(() => {
    setAnimTrig(animTrig + 1)
  
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
            disabled={filterOutServiceOverlap(times, serviceDuration).includes(timeobj.value) ? false : true}

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
  display: flex;
  flex-wrap: wrap;
  gap: .1em;
  /* flex-direction: column; */

  li{
    width: 5em;
    animation-duration: .3s;
    animation-name: reveal;
    animation-timing-function: ease;
  }
  li:nth-child(n+1):nth-child(-n+4),
  li:nth-child(8n+1),
  li:nth-child(8n+2),
  li:nth-child(8n+3),
  li:nth-child(8n+4) {
    border-bottom: solid #959595 1px;
  }


  .active{
    background-color: var(--c-1);
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

function filterOutServiceOverlap(times:string[], durationHours:number){
  console.table(times);
  
  // if times.value + duration overlaps last times (do not return)
  // if times.value - duration overlaps start times (do not return)
  const startDate = new Date(`2000-01-01T${times[0]}`)
  // todo has to be aware of when any BUSYDAY starts

  // const filteredTimes = times.filter(time => {
  //   const specificTime = new Date(`2000-01-01T${time}`)

  //   if(openDate <= specificTime && specificTime <= closedDate){
  //     return true
  //   }

  //   return false

  // })
  // console.log({filteredTimes});
  
  

  // return filteredTimes
  return times
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

  
  return filteredTimes

}