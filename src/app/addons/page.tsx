import { envs } from '@/envs'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import fetchServicesAndAddons from '@lib/fetchdata/fetchServicesAndAddons'
import { Metadata } from 'next'
import NoDataFoundError404 from '../not-found'
import ErrorMessage from '@components/ErrorMessage'
import { Addon } from '@ks/types'
import { List } from '@components/elements/List'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/session'
import fetchAddons from '@lib/fetchdata/fetchAddons'

export const metadata: Metadata = {
  title: 'Addons | ' + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function AddonsPage ({ params, searchParams }:Props) {

  const session = await getServerSession(nextAuthOptions);
  const {addons, error} = await fetchAddons(session)

  if(error) return <ErrorMessage error={error}/>
  if(!addons) return <NoDataFoundError404> <p> No Addons Found </p></NoDataFoundError404>

  return (
    <PageTHeaderMain
      header={Header()}
      main={Main(addons)}
    />
  )
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1> Addons </h1>
      </Section>
    </>
}

function Main(addons:Addon[]){

  return<>
    <Section layout={'1'}>
      <List>
        {addons.map((ad,i) => <Link key={i} href={`/addons/${ad.id}`}>{ad.name}</Link>)}
      </List>
    </Section>
  </>
}