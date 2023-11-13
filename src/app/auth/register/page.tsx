import { envs } from '@/envs'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function RegisterPage ({ params, searchParams }:Props) {
  return (
    <PageTHeaderMain
      header={Header()}
      main={Main()}
    />
  )
}

function Header(){

  return<header>
    <h1> RegisterPage </h1>
  </header>
}

function Main(){

  return<>
    <Section layout={'1'}>
      <p> 
        Accounts must be registered by an admin. 
        Contact <strong>{envs.ADMIN_EMAIL_ADDRESS}</strong> have an account created.
      </p>
    </Section>
  </>
}