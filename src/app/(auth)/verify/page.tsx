import ErrorMessage from '@components/ErrorMessage'
import { Callout } from '@components/blocks/Callout'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { VerifyEmailCard } from '@components/menus/VerifyEmailCard'
import { fetchVerifyEmail } from '@lib/fetchdata/fetchVerifyEmail'
import Link from 'next/link'
type Props = {
  searchParams:{
    email:string,
    token:string,
  }
}

export default async function VerifyPage ({ searchParams }:Props) {

  const { email, token } = searchParams

  if(!email || !token) return <main>
    <Section layout={'1'}>
      <p> not sure how you got here without a key... </p>
      <p> <Link href={`/account`}> Get otta here </Link> </p>
    </Section>
  </main>

  const { data, error } = await fetchVerifyEmail(email, token)


  return (
    <PageTHeaderMain
      header={Header()}
      main={Main(email, token, data, error)}
    />
  )
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1> Verify Account </h1>
    </Section>
  </>
}


function NotSuccessMessage({error, email}:any){

  switch (true) {
    case String(error).includes('user already is of role'):
      return<>
        <Callout intent={'success'}>
          <p> This account is already verified. </p>
          <p> <Link href={'/account'}> View account </Link></p>
        </Callout>
      </>
  
    default:
      return  <>
        <ErrorMessage error={error}> </ErrorMessage> 
        <VerifyEmailCard email={email} />
      </>
  }
}

function Main(email:string, token:string, data?:unknown, error?:any){

  if(error) return <Section layout={'1'}>

    <NotSuccessMessage error={error} email={email} />

  </Section>

  return<>
    <Section layout={'1'}>
      <h3 className='success'> Success </h3>
      <p> The email <strong>{email}</strong> has been verified</p>
      <p> <Link href={'/account'}> View account </Link></p>
    </Section>
  </>
}