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
}

type TimeOpt = {
  value: string,
  label: string,
}


const generatedTimeStrings = generateTimesArray().map(t => t.value)
const generatedTimes = generateTimesArray()

// todo just start at 00:00:00 and have 15min incraments. then from there filter out times that don't work.
export function TimePicker({values, setValues, times, buisnessHours}:iProps) {
  
  // console.log({times});
  
  // console.log('time picker input times', {times});
  const [animTrig, setAnimTrig] = useState(0)
  const [currentTimes, setCurrentTimes] = useState(filterOutOfBuisness(generatedTimes, buisnessHours))

  function handleTimeFormat(time: string) {
    const newDate = new Date()
    const hours = time.split(':')[0]
    const mins = time.split(':')[1]

    newDate.setHours(Number(hours), Number(mins))

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
          <button type='button' className={timeobj.value === values.timeStart ? 'active' : ''}
            onClick={() => setValues((prev:any) => ({...prev, timeStart: timeobj.value}))} 
            // todo defaultTimes.includes(!timeobj.value) ? true : false)
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

function filterOutOfBuisness(times:TimeOpt[], buisnessHours:{start:string,end:string}){

  const openDate = new Date(`2000-01-01T${buisnessHours.start}`)
  const closedDate = new Date(`2000-01-01T${buisnessHours.end}`)

  
  const filteredTimes = times.filter(time => {
    const specificTime = new Date(`2000-01-01T${time.value}`)

    if(openDate <= specificTime && specificTime <= closedDate){
      return true
    }
    
    // console.log('!!!!!!! sits inside buisness hours ');
    // console.table({
    //   openDate: openDate.toLocaleString('en-US', { hour12: false }),
    //   closedDate: closedDate.toLocaleString('en-US', { hour12: false }),
    //   specificTime: specificTime.toLocaleString('en-US', { hour12: false }),
    //   timeValue: time.value,
    // });

    return false

  })

  
  return filteredTimes

}