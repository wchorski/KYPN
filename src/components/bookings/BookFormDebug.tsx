'use client'
import React from "react"
import { Addon, Availability, Booking, BookingPrevious, Service, Session, User } from "@ks/types";

type Props = {
  data: {
    services?:Service[] | undefined, 
    locations?:Location[] | undefined, 
    addons?:Addon[] | undefined,
    employees?:User[] | undefined,
    availabilities?:Availability[] | undefined,
    gigs?:Booking[] | undefined,
    prevBooking?:BookingPrevious | undefined,
  }
  session?:Session,
}

export function BookFormDebug ({ data }:Props) {
  return (
    <div>
      <h2>
        BookFormDebug
      </h2> 

      <h4> Services: </h4>
      <ul>
        {/* {data?.services?.map(s => <li>s.name</li>)} */}
      </ul>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}