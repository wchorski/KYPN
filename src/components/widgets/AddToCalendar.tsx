'use client'
import { LoadingAnim } from "@components/elements/LoadingAnim";
// import { AddToCalendarButton } from "add-to-calendar-button-react"
import { useEffect, useState } from "react";

type Props = {
  summary:string,
  start:string,
  end:string,
}

const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export function AddToCalendar ({ summary, start, end }:Props) {

  const [hasMounted, setHasMounted] = useState(false)
  //@ts-ignore
  const [startDate, setStartDate] = useState(new Date(start || '').toLocaleDateString('en-CA', options))
  //@ts-ignore
  const [endDate, setEndDate] = useState(new Date(end || '').toLocaleDateString('en-CA', options))

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return <p>add to calendar placeholder</p>
  // if (!hasMounted) return <LoadingAnim />
  
  // return (
  //   <AddToCalendarButton
  //     name={summary}
  //     startDate={startDate}
  //     startTime={new Date(start || '').toLocaleTimeString('en-CA', {hour12:false })}
  //     endDate={endDate}
  //     endTime={new Date(end || '').toLocaleTimeString('en-CA', {hour12:false })}
  //     timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
  //     options={['Apple','Google','Yahoo','iCal']}
  //   />
  // )
}