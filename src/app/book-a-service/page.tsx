import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { BookingForm3 } from "@components/bookings/BookingForm3"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"
import { Addon, Availability, Booking, BookingPrevious, Service, Session, User, Location } from "@ks/types"
import fetchBookingFormData from "@lib/fetchdata/fetchBookingFormInfo"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import NoDataFoundError404 from "../not-found"
import { plainObj } from "@lib/utils"

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
  // const { services, locations, addons, employees, availabilities, gigs, error } = await fetchBookingFormData()
  const session = await getServerSession(nextAuthOptions)
  const {data, error} = await fetchBookingFormData()
  

  if(error) return <ErrorMessage error={error} />
  if(!data) return <NoDataFoundError404><p>No data found for booking</p></NoDataFoundError404>

  // const data = {services, locations, addons, employees, availabilities, gigs, session, prevBooking}

  return(
    <PageTHeaderMain 
      header={Header()}
      main={Main({data, session})}
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
  data: {
    services?:Service[] | undefined, 
    locations?:Location[] | undefined, 
    addons?:Addon[] | undefined,
    employees?:User[] | undefined,
    availabilities?:Availability[] | undefined,
    gigs?:Booking[] | undefined,
    prevBooking?:BookingPrevious | undefined,
  }
  session:any,
}

async function Main({
  data
}: Main){

  return<>
  <Section layout={'1'}>
    <BookingForm3 data={plainObj(data)}/>
  </Section>
  </>
}