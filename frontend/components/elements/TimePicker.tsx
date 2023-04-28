import styled from "styled-components"

interface iProps {
  values: any | undefined,
  setValues: any,
  times: string[] | undefined,
  setTimes: any,
}

export function TimePicker({values, setValues, times}:iProps) {

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

  return (
    <StyledTimePicker className={values['date'] ? 'open' : ''}>
      {times?.map((time, i) => (
        <li key={`time-${i}`}>
          <button type='button' className={time === values['time'] ? 'active' : ''}
            onClick={() => setValues((prev:any) => ({...prev, time: time}))} >
            {handleTimeFormat(time)}
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

  .active{
    background-color: var(--c-1);
  }

  @keyframes reveal {
    0% { 
      opacity: .2;
    }
    100% { 
      opacity: 1;
    }
  }
`