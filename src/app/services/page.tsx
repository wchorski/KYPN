import { envs } from '@/envs'
import { List } from '@components/elements/List'
import { Card } from '@components/layouts/Card'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { Addon, Service } from '@ks/types'
import fetchServicesAndAddons from '@lib/fetchdata/fetchServicesAndAddons'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services | ' + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function ServicesPage ({ params, searchParams }:Props) {

  const { services, addons, error} = await fetchServicesAndAddons()

  return (
    <PageTHeaderMain
      header={Header()}
      main={Main(services, addons)}
    />
  )
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1> Services </h1>
    </Section>
  </>
}

function Main(services?:Service[], addons?:Addon[]){

  return<>
    <Section layout={'1'}>
      <List gap='1rem'>
        {services?.map(serv => (
          <Card>
            <Link href={`/service/${serv.id}`}> {serv.name}</Link>
            <p>{serv.description}</p>
          </Card>
        ))}
      </List>
    </Section>
    <Section layout={'1'}>
      <h2 id='addons'> Add-Ons</h2>
      <List>
        {addons?.map(serv => (
          <Link href={`/services/${serv.id}`}> {serv.name}</Link>
        ))}
      </List>
    </Section>
  </>
}