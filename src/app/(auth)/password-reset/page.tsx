import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { PasswordResetForm } from '@components/menus/PasswordResetForm'
import { BlockLayout } from '@components/layouts/BlockLayout'
type Props = {
  searchParams:{
    token:string,
    email:string,
  }
}

export default async function PasswordResetPage ({  searchParams }:Props) {

  const { token, email } = searchParams

  return (
    <PageTHeaderMain
      header={Header()}
      main={Main(token, email)}
    />
  )
}

function Header(){

  return<>
    <BlockLayout layout={'1'}>
      <h1> Password Reset </h1>
    </BlockLayout>
  </>
}

function Main(token:string, email:string){

  return<>
    <BlockLayout layout={'1'}>
      <PasswordResetForm token={token} email={email} />
    </BlockLayout>
  </>
}