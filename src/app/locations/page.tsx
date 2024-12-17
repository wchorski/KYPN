import { NoData } from '@components/elements/NoData'
import { Card } from '@components/layouts/Card'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { Location } from '@ks/types'
import fetchLocations from '@lib/fetchdata/fetchLocations'
import Link from 'next/link'
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function LocationsPage ({ params, searchParams }:Props) {

  const {locations, error } = await fetchLocations()
  

  return (
    <PageTHeaderMain
      header={Header()}
      main={Main(locations)}
    />
  )
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1> LocationsPage </h1>
    </Section>
  </>
}

function Main(locations:Location[]|undefined){

  if(!locations) return <NoData />

  return<>
    <Section layout={'1'}>

      {locations?.map(loc => (
        <Card key={loc.id}>
          <Link href={`/locations/${loc.id}`}>
            <article>
              <h4>{loc.name}</h4>

              <address>
                {loc.address}
              </address>

              {/* {address && (
                <Map address={address}/>
              )} */}
              
            </article>
          </Link>
        </Card>
      ))}
    </Section>
  </>
}