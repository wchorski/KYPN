import { useEffect, useState } from "react"
import styled from "styled-components"

interface iProps {
  values: any | undefined,
  setValues: any,
  times: string[] | undefined,
}

export function TimePicker({values, setValues, times}:iProps) {
  
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

  useEffect(() => {
    setAnimTrig(animTrig + 1)
  
    // return () => 
  }, [times])
  

  return (
    <StyledTimePicker className={values['date'] ? 'open' : ''} key={animTrig}>
      {times?.map((time, i) => (
        <li key={`time-${i}`}>
          <button type='button' className={time === values['time'] ? 'active' : ''}
            onClick={() => setValues((prev:any) => ({...prev, time: time}))} >
            {handleTimeFormat(time)} , {time}
          </button>
        </li>
      ))}
    </StyledTimePicker>
  )
}

const StyledTimePicker = styled.ul`
  transition: all .3s;
  animation: reveal  1s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  column-count: 3;
  min-height: 11em;

  .active{
    background-color: var(--c-1);
  }

  @keyframes reveal {
    0% { 
      transform: translateY(-3px);
      opacity: .1;
    }
    100% { 
      transform: translateY(0px);
      opacity: 1;
    }
  }
`