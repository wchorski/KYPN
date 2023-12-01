import { envs } from '@/envs'
import { List } from '@components/elements/List'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import Link from 'next/link'
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function AdminPage ({ params, searchParams }:Props) {
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
      <h1> Admin Tools </h1>
      <p className={'subtext'} > custom tools specifically designed per admin needs </p>
    </Section>
  </>
}

function Main(){

  return<>
    <Section layout={'1'}>
      <Link href={envs.BACKEND_URL} className='button large'> Admin Dashboard </Link>
      <List>
        <Link href={`/users`}> Users </Link>
        <Link href={`/locations`}> Locations </Link>
      </List>
    </Section>
  </>
}