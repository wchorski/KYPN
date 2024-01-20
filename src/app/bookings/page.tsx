import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { BookingForm } from "@components/bookings/BookingForm"
import { BookingForm3 } from "@components/bookings/BookingForm3"
import { Button } from "@components/elements/Button"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"
import { Addon, Availability, Booking, BookingPrevious, Service, Session, User, Location } from "@ks/types"
import fetchBookingFormData from "@lib/fetchdata/fetchBookingFormInfo"
import fetchServicesAndAddons from "@lib/fetchdata/fetchServicesAndAddons"
import { Metadata } from "next"
import { getServerSession } from "next-auth"

export const metadata: Metadata = {
  title: 'Bookings | ' + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

type Props = {
  searchParams:{
    bookingId:string,
    serviceId:string,
    locationId?:string,
    staffId?:string,
    date?:string,
    time?:string,
  }
  // params:{id:string}
}

export default async function BookingsPage ({ searchParams }:Props) {

  const { bookingId, serviceId, locationId, staffId, date, time } = searchParams

  const prevBooking = {
    bookingId,
    serviceId,
    locationId,
    staffId,
    date,
    time, 
  }
  
  

  // const { services, addons, error } = await fetchServicesAndAddons()
  const { services, locations, addons, employees, availabilities, gigs, error } = await fetchBookingFormData()
  const session = await getServerSession(nextAuthOptions)
  

  if(error) return <ErrorMessage error={error} />

  return(
    <PageTHeaderMain 
      header={Header()}
      // @ts-ignore
      main={Main({services, locations, addons, employees, availabilities, gigs, session, prevBooking })}
    />
  )
}

function Header(){
  
  return<>
  <Section layout={'1'}>
    <h1> Book a Service </h1>
    </Section>
  </>
}

type Main = {
  services:Service[]|undefined, 
  locations:Location[]|undefined, 
  addons:Addon[]|undefined,
  employees:User[]|undefined,
  availabilities:Availability[]|undefined,
  gigs:Booking[]|undefined,
  session:Session,
  prevBooking?:BookingPrevious,
}

function Main({
  services = [], 
  locations = [], 
  addons = [],
  employees = [],
  availabilities = [],
  gigs = [],
  session,
  prevBooking,
  
}: Main){


  return<>
  <Section layout={'1'}>

    <BookingForm3 
      services={services}
      locations={locations}
      addons={addons}
      employees={employees}
      availabilities={availabilities}
      gigs={gigs}
      session={session}
      prevBooking={prevBooking}
    />
    {/* <BookingForm 
      services={services}
      addons={addons}
      session={session}
      prevBooking={prevBooking}
    /> */}
  </Section>
  </>
}