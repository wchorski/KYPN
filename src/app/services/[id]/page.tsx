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
        {description}
      </Card>

      <Link href={`/bookings?serviceId=${id}`} className='button large'> Book this Service </Link>

      <h2> Addons Available </h2>
      <List>
        {addons?.map(ad => (
          <Link key={ad.id} href={`/addons/${ad.id}`}> {ad.name}</Link>
        ))}
      </List>
    </Section>
  </>
}