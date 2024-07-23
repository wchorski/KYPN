import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import Link from 'next/link'
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function BookingsPage ({ params, searchParams }:Props) {
  return (
    <PageTHeaderMain
      header={Header()}
      main={Main()}
    />
  )
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1> All Bookings </h1>
    </Section>
  </>
}

function Main(){

  return<>
    <Section layout={'1'}>
      <p> Looking to <Link href={`/book-a-service`}> Book a Service</Link>? </p>
    </Section>
  </>
}