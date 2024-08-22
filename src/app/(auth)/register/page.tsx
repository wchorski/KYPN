import { envs } from '@/envs'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { RegsiterForm } from '@components/menus/RegisterForm'
import { Metadata } from 'next'
import { BlockLayout } from '@components/layouts/BlockLayout'

export const metadata: Metadata = {
  title: 'Regsiter | ' + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

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

  return<>
    <BlockLayout layout={'1'}>
      <h1> Register an Account </h1>
    </BlockLayout>
  </>
}

function Main(){

  return<>
    <BlockLayout layout={'1'}>
      {/* <p> 
        Accounts must be registered by an admin. 
        Contact <strong>{envs.ADMIN_EMAIL_ADDRESS}</strong> have an account created.
      </p> */}
      <RegsiterForm />
    </BlockLayout>
  </>
}