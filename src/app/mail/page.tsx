import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { HtmlBookings } from './HtmlBookings'
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function MailTempatePage ({ params, searchParams }:Props) {
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
      <h1> MailTempatePage </h1>
    </Section>
  </>
}

function Main(){

  return<>
    <Section layout={'1'}>
      <HtmlBookings 
        id={'thisid'} 
        operation={'create'} 
        booking={{
          name: 'yandle',
          email: 'yan@m.lan',
          phone: '123 123 1234',
          service: {
            name: 'big serv',
          },
          status: "HOLD",
          start: '2023-11-23T09:00',

        }}/>
    </Section>
  </>
}