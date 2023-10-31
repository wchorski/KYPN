import { envs } from "@/envs"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Event } from '@ks/types'
import { Section } from "@components/layouts/Section"
import fetchEvents from "@lib/fetchdata/fetchEvents"
import { Metadata, ResolvingMetadata } from "next"
import styles from '@styles/events/events.module.scss'
import { EventCard } from "@components/events/EventCard"

type Props = {
  params:{
    slug:string,
  },
  searchParams: {
    [key: string]: string | string[] | undefined, 
    q: string | undefined, 
  }
}

export const metadata: Metadata = {
  title: 'Events' + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

const today = new Date()
const thisMonth = new Date(today.getFullYear(), today.getMonth())

export default async function EventsPage ({ params, searchParams }:Props) {

  const { events, count, error } = await fetchEvents(thisMonth)
  

  return (
    <PageTHeaderMain 
      header={Header()}
      main={Main(events, count)}
    />
  )
}

function Header(){

  return <header>
    <h1> Events </h1>
  </header>
}

function Main(events:Event[]|undefined, count:number|undefined){

  return<>
    <Section layout={'1'}>
      calendar
    </Section>

    <Section layout={'1'}>
      <ul className={styles.events}>
        <li>
          {events?.map(e => (
            <li key={e.id}>
              <EventCard {...e} />
            </li>
          ))}
        </li>
      </ul>
    </Section>
  </>
}