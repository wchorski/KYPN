import { envs } from '@/envs'
import { PriceTag } from '@components/ecommerce/PriceTag'
import { ImageDynamic } from '@components/elements/ImageDynamic'
import { List } from '@components/elements/List'
import { Card } from '@components/layouts/Card'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { Addon } from '@ks/types'
import fetchAddon from '@lib/fetchdata/fetchAddon'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(
  { params }:Props,
  parent: ResolvingMetadata,
): Promise<Metadata>  {

  const { id } = params
  const { addon , error} = await fetchAddon(id)

  return {
    title: addon?.name + ' | ' + envs.SITE_TITLE,
    description: envs.SITE_DESC,
  }
}

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function AddonByIdPage ({ params, searchParams }:Props) {

  const { id } = params

  const { addon, error } = await fetchAddon(id)

  return (
    <PageTHeaderMain
      header={Header(addon?.name)}
      main={Main(addon)}
    />
  )
}

function Header(name?:string){

  return<>
    <Section layout={'1'}>
      <h1> Addon: {name} </h1>
    </Section>
  </>
}

function Main(addon?:Addon){
 
  if(!addon) return <p> no addon found </p>
  const { id, excerpt, price, image, services, categories, tags } = addon

  return<>
    <Section layout={'1'}>
      <ImageDynamic photoIn={image} />
      <PriceTag price={price} /> 
      <Card>
        <p> {excerpt} </p>
      </Card>

      <h2> Related Services </h2>
      <List>

        {services?.map(serv => (
          <div key={serv.id}>
            <Link href={`/services/${serv.id}`}>
              <h4>{serv.name}</h4>
            </Link>
          </div>
        ))}

      </List>

      <Link href={`/bookings`} className='button large'> Book a Service </Link>
      
    </Section>
  </>
}