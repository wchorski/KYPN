import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { BookingForm } from "@components/bookings/BookingForm"
import { Button } from "@components/elements/Button"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"
import { Addon, Booking, BookingPrevious, Service, Session,  } from "@ks/types"
import fetchServicesAndAddons from "@lib/fetchdata/fetchServicesAndAddons"
import { getServerSession } from "next-auth"

type Props = {
  searchParams:{
    bookingId:string,
    serviceId:string,
    locationId?:string,
    staffId?:string,
    date?:string,
    time?:string,
  }
  params:{id:string}
}

export default async function BookingsPage ({ params, searchParams }:Props) {

  const { bookingId, serviceId, locationId, staffId, date, time } = searchParams

  const prevBooking = {
    bookingId,
    serviceId,
    locationId,
    staffId,
    date,
    time, 
  }
  
  

  const { services, addons, error } = await fetchServicesAndAddons()
  const session = await getServerSession(nextAuthOptions)
  

  if(error) return <ErrorMessage error={error} />

  return(
    <PageTHeaderMain 
      header={Header()}
      // @ts-ignore
      main={Main({services, addons, session, prevBooking: bookingId ? prevBooking : null })}
    />
  )
}

function Header(){
  
  return <header>
    <h1>
      Book a Service
    </h1>
  </header>
}

type Main = {
  services:Service[]|undefined, 
  addons:Addon[]|undefined,
  session:Session,
  prevBooking?:BookingPrevious,
}

function Main({
  services = [], 
  addons = [],
  session,
  prevBooking,
}: Main){


  return<>
  <Section layout={'1'}>

    <BookingForm 
      services={services}
      addons={addons}
      session={session}
      prevBooking={prevBooking}
    />
  </Section>
  </>
}