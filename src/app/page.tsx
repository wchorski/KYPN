import { envs } from '@/envs'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import Link from 'next/link'
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function AppPage ({ params, searchParams }:Props) {
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
    <h1>{envs.SITE_TITLE}</h1>
    
    </Section>
  </>
}

function Main(){

  return<>
    <Section layout={'1'}>
      <Link href={`/home`}> Take Me Home </Link>
    </Section>
  </>
}