import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import LoginForm from '@components/menus/LoginForm'
import { PasswordRequestForm } from '@components/menus/PasswordRequestForm'
import { PasswordResetForm } from '@components/menus/PasswordResetForm'
import Link from 'next/link'
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function LoginPage ({ params, searchParams }:Props) {
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
      <h1> Login or Register Account </h1>
    </Section>
  </>
}

function Main(){

  return<>
    <Section layout={'1_1'}>

      <h4>
        <Link href={`/api/auth/signin`} className='button large'> Login </Link>
      </h4>
      
      <div>
        {/* <LoginForm /> */}

        <PasswordRequestForm />

      </div>
    </Section>
  </>
}