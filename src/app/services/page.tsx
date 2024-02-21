import { envs } from '@/envs'
import { InfoCard, InfoCardList } from '@components/blocks/InfoCardList'
import { ImageDynamic } from '@components/elements/ImageDynamic'
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

// grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));

function Main(services?:Service[], addons?:Addon[]){


  const infocardServices:InfoCard[]|undefined = services?.map(serv => ({
    header: serv.name,
    content: serv.excerpt,
    buttonLink: `/services/${serv.id}`,
    buttonLabel: 'View Package',
    imageSrc: serv.image,
    color: 'var(--c-primary)'
  })) 

  const infocardAddons:InfoCard[]|undefined = addons?.map(add => ({
    header: add.name,
    content: add.excerpt,
    buttonLink: `/addons/${add.id}`,
    buttonLabel: 'more details',
    imageSrc: add.image,
    color: 'var(--c-primary)'
  })) 

  return<>
    <Section layout={'1'}>
      <InfoCardList 
        items={infocardServices || []}
      />
    </Section>
    <Section layout={'1'}>
      <h2 id='addons'> Add-Ons</h2>
      <InfoCardList 
        items={infocardAddons || []}
      />
      {/* <List>
        {addons?.map(serv => (
          <Link href={`/services/${serv.id}`}> {serv.name}</Link>
        ))}
      </List> */}
    </Section>
  </>
}