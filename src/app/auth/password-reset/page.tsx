import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { PasswordResetForm } from '@components/menus/PasswordResetForm'
type Props = {
  searchParams:{
    token:string,
  }
}

export default async function PasswordResetPage ({  searchParams }:Props) {

  const { token } = searchParams

  return (
    <PageTHeaderMain
      header={Header()}
      main={Main(token)}
    />
  )
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1> Password Reset </h1>
    </Section>
  </>
}

function Main(token:string,){

  return<>
    <Section layout={'1'}>
      <PasswordResetForm token={token}  />
    </Section>
  </>
}