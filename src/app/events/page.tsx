import { envs } from "@/envs"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Event } from '@ks/types'
import { Section } from "@components/layouts/Section"
import fetchEvents from "@lib/fetchdata/fetchEvents"
import { Metadata, ResolvingMetadata } from "next"
import styles from '@styles/events/events.module.scss'
import { EventCard } from "@components/events/EventCard"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import { EventsCalendar } from "@components/events/EventsCalendar"

type Props = {
  params:{
    slug:string,
  },
  searchParams: {
    [key: string]: string | string[] | undefined, 
    date: string | undefined, 
  }
}

export const metadata: Metadata = {
  title: 'Events' + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

const today = new Date()
const thisMonth = new Date(today.getFullYear(), today.getMonth())

export default async function EventsPage ({ params, searchParams }:Props) {
  
  const dateParam  = searchParams?.date || today.toDateString()
  const date = new Date(dateParam).toDateString()
  const { events, count, error } = await fetchEvents(thisMonth)

  return (
    <PageTHeaderMain 
      header={Header()}
      headerIsDisplayed={false}
      main={Main( events, count, date )}
    />
  )
}

function Header(){


  return<>
    <Section layout={'1'}>
      <h1> Events </h1>
    </Section>
  </>
  
}

function Main(
  events:Event[]|undefined, 
  count:number|undefined,
  date:string
){

  return<>
    <Section layout={'1'}>
      <EventsCalendar date={date} events={events} />
    </Section>

    <Section layout={'1'}>
      <ul className={styles.events}>
    
        {events?.map(e => (
          <li key={e.id}>
            <EventCard {...e} />
          </li>
        ))}
    
      </ul>
    </Section>
  </>
}
