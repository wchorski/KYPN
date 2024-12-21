import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { Location } from '@ks/types'
import fetchLocation from '@lib/fetchdata/fetchLocation'
import styles from '@styles/location.module.scss'
import Map from "@components/blocks/Map";
import { NoData } from '@components/elements/NoData'

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function LocationByIdPage ({ params, searchParams }:Props) {

  const { id } = await params

  const { location } = await fetchLocation(id)

  return (
    <PageTHeaderMain
      header={Header(location?.name)}
      main={Main(location)}
    />
  )
}

function Header(name?:string){

  return<>
    <Section layout={'1'}>
      <h1> {name} </h1>
    </Section>
  </>
}

function Main(location:Location|undefined){

  if(!location) return <NoData />

  const { name, address, } = location

  return<>
    <Section layout={'1'}>
      <article className={styles.location} >

        <address>
          {address}
        </address>

        {address && (
          <Map address={address}/>
        )}
        
      </article>
    </Section>
  </>
}