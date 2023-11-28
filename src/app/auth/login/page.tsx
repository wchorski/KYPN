import { nextAuthOptions } from '@/session'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { LoginForm } from '@components/menus/LoginForm'
import { PasswordRequestForm } from '@components/menus/PasswordRequestForm'
import { PasswordResetForm } from '@components/menus/PasswordResetForm'
import { RegsiterForm } from '@components/menus/RegisterForm'
import { getServerSession } from 'next-auth'
import { getCsrfToken, getProviders } from 'next-auth/react'
import Link from 'next/link'
import { CSSProperties } from 'react'
type Props = {
  searchParams:{reset:string}
  params:{id:string}
}

export default async function LoginPage ({ params, searchParams }:Props) {

  const { reset } = searchParams

  const session = await getServerSession(nextAuthOptions)

  const providers = await getProviders()

  return (
    <PageTHeaderMain
      header={Header()}
      main={Main(providers, reset, session?.user?.email)}
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

function Main(providers:any, reset?:string, sessionEmail?:string|null){

  return<>
    <Section layout={'1_1'}>

      <div style={styleForms}>
        {sessionEmail && <p> currently logged in with email {sessionEmail}</p>}
        <LoginForm providers={providers} />

        {reset ? (
          <PasswordRequestForm />
        ) : (
          <Link 
            href={`?${new URLSearchParams({ reset: 'true'})}`}
          > 
            password reset
          </Link>
        )}
      </div>

      
      <div>

        <RegsiterForm />

      </div>
    </Section>
  </>
}

const styleForms = {
  display: 'grid',
  gap: '1rem',
} as CSSProperties