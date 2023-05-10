import { useEffect, useState } from "react"
import styled from "styled-components"

interface iProps {
  values: any | undefined,
  setValues: any,
  times: string[] | undefined,
  slots: {
    start: string,
    end: string,
  }[]
  duration: string,
}

export function TimePicker({values, setValues, times, slots, duration}:iProps) {
  
  // console.log('time picker input times', {times});
  const [animTrig, setAnimTrig] = useState(0)

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

  function handleCalcEnd(time:string){
    return addHoursToTime(time, Number(duration))
  }

  useEffect(() => {
    setAnimTrig(animTrig + 1)
  
    // return () => 
  }, [times, slots])

  const listitemStyle = (i:number) => ({
    animationDelay: `calc(${i} * 0.03s)` ,
  })

  function handleTimeUpdate(start:string, end:string){
    setValues((prev:any) => (
      {
        ...prev, 
        timeStart: start,
        timeEnd: end,
      }
    ))
  }
  // function handleTimeUpdate(time:string){
  //   setValues((prev:any) => (
  //     {
  //       ...prev, 
  //       timeStart: time,
  //       timeEnd: addHoursToTime(time, Number(duration)),
  //     }
  //   ))
  // }
  

  return (
    <StyledTimePicker className={values['date'] ? 'open' : ''} key={animTrig}>
      {slots?.map((slot, i) => (
        <li key={`time-${i}`} style={listitemStyle(i)} >
          <button type='button' className={slot.start === values.timeStart ? 'active' : ''}
            onClick={() => handleTimeUpdate(slot.start, slot.end)} 
          >
            {handleTimeFormat(slot.start)} <br />
            to <br />
            {handleTimeFormat(slot.end)} <br /> 
            <br />
            <br />
            {slot.start} <br />
            to <br />
            {slot.end} <br /> 
          </button>
        </li>
      // {times?.map((time, i) => (
      //   <li key={`time-${i}`} style={listitemStyle(i)} >
      //     <button type='button' className={time === values['time'] ? 'active' : ''}
      //       onClick={() => handleTimeUpdate(time)} 
      //     >
      //       {handleTimeFormat(time)} <br />
      //       to <br />
      //       {handleTimeFormat(addHoursToTime(time, Number(duration)))} <br /> <br />
      //       {addHoursToTime(time, Number(duration))} <br /> <br />
      //       24hr: {time}
      //     </button>
      //   </li>
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
  gap: 1em;
  /* flex-direction: column; */

  /* li{
    transition: all .3s;
    animation-name: reveal;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-delay: calc(var(--i) * 0.1s)
  } */
  li{
    width: 5em;
    animation-duration: .3s;
    animation-name: reveal;
    animation-timing-function: ease;
    /* animation-timing-function: cubic-bezier(0,1.11,.97,-0.38); */
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

function addHoursToTime(time:string, hoursToAdd:number) {
  const [hours, minutes, seconds] = time.split(':').map(Number)
  const date = new Date()
  
  date.setHours(hours)
  date.setMinutes(minutes + hoursToAdd * 60)
  date.setSeconds(seconds)
  
  const options = {
    hour12: false, 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric'
  }
  // @ts-ignore
  return date.toLocaleTimeString('en-US', options);
}