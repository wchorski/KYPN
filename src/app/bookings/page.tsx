import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { BookingForm } from "@components/bookings/BookingForm"
import { Button } from "@components/elements/Button"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"
import { Addon, Service, Session,  } from "@ks/types"
import fetchServicesAndAddons from "@lib/fetchdata/fetchServicesAndAddons"
import { getServerSession } from "next-auth"

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function BookingsPage ({ params, searchParams }:Props) {

  const { services, addons, error } = await fetchServicesAndAddons()
  const session = await getServerSession(nextAuthOptions)
  

  if(error) return <ErrorMessage error={error} />

  return(
    <PageTHeaderMain 
      header={Header()}
      // @ts-ignore
      main={Main(services, addons, session)}
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

function Main(
  services:Service[]|undefined = [], 
  addons:Addon[]|undefined = [],
  session:Session,
){


  return<>
  <Section layout={'1'}>

    <BookingForm 
      services={services}
      addons={addons}
      session={session}
    />
  </Section>
  </>
}