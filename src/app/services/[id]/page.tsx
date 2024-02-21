import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import fetchService from '@lib/fetchdata/fetchService'
import { Service } from '@ks/types'
import { ImageDynamic } from '@components/elements/ImageDynamic'
import { BlockRender } from '@components/blocks/BlockRender'
import { Card } from '@components/layouts/Card'
import { PriceTag } from '@components/ecommerce/PriceTag'
import { List } from '@components/elements/List'
import Link from 'next/link'
import { timePretty } from '@lib/dateFormatter'
import { daysOfWeek } from '@lib/dateCheck'
import { Metadata, ResolvingMetadata } from 'next'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/session'
import { envs } from '@/envs'

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
 
  // fetch data
  const session = await getServerSession(nextAuthOptions)
  const { service, error } = await fetchService(params?.id)

  if(!service) return {
    title: envs.SITE_TITLE,
    description: envs.SITE_DESC,
  }

  const { id, name, excerpt, image, categories, tags} = service
  
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  
  return {
    metadataBase: new URL(envs.FRONTEND_URL),
    title: name,
    description: excerpt,
    openGraph: {
      images: [String(image), ...previousImages],
      title: name,
      description: excerpt,
      url: envs.FRONTEND_URL + '/bookings?serviceId=' + id,
      type: 'article'
    },
    keywords: tags?.map(tag => tag.name).join(', ') + ' ' + categories?.map(cat => cat.name).join(', '),
    // authors: [{name: author?.name, url: author?.url}]
  }
}

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function ServiceByIdPage ({ params, searchParams }:Props) {

  const { service, error } = await fetchService(params.id)
  console.log({error});

  return (
    <PageTHeaderMain
      header={Header(service?.name)}
      main={Main(service)}
    />
  )
}

function Header(name?:string){

  return<>
    <Section layout={'1'}>
      <h1> Service: {name} </h1>
    </Section>
  </>
}

function Main(service?:Service){

  if(!service) return <p> Service not found </p>

  const { id, description, price, image, durationInHours, buisnessHourClosed, buisnessHourOpen, buisnessDays, addons, locations, categories, tags} = service

  return<>
    <Section layout={'1'}>
      <ImageDynamic photoIn={image} />
      <PriceTag price={price} />

      <table>
        <tbody>
          <tr>
            <td> Service Duration: </td>
            <td> {durationInHours} <small className='subtext'> hours </small> </td>
          </tr>
          <tr>
            <td> Buisness Days: </td>
            <td> {daysOfWeek(buisnessDays).join(', ')} </td>
          </tr>
          <tr>
            <td> Hours Open: </td>
            <td> {timePretty(buisnessHourOpen)} </td>
          </tr>
          <tr>
            <td> Hours Closed: </td>
            <td> {timePretty(buisnessHourClosed)} </td>
          </tr>

        </tbody>
      </table>
      
      <Card>
        <BlockRender document={description.document} />
      </Card>

      <Link href={`/bookings?serviceId=${id}`} className='button large'> Book this Service </Link>

      <h2 id='addons'> Addons Available </h2>
      <List>
        {addons?.map(ad => (
          <Link key={ad.id} href={`/addons/${ad.id}`}> {ad.name}</Link>
        ))}
      </List>
    </Section>
  </>
}