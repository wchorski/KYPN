import ErrorMessage from '@components/ErrorMessage'
import { LoadingAnim } from '@components/elements/LoadingAnim'
import { Table } from '@components/elements/Table'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { envs } from '@/envs'
import { fetchUsers } from '@lib/fetchdata/fetchUsers'
import { User } from '@ks/types'
import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/session'
  
type Props = {
  children:ReactNode
}

const page = 1
const perPage = envs.PERPAGE

export default async function UsersPage ({ children }:Props) {

  const session = await getServerSession(nextAuthOptions);
  const { users, error } = await fetchUsers( page, perPage, session)
  

  if(error) return <ErrorMessage error={error} />
  if(!users) return <p> no users found </p>
  

  const cells = users.map((user:User) => ({
    name: user.name,
    email: user.email,
    role: user.role?.name,
    account: user.id,
  }))

  // return <p> the page </p>

  return (
    <PageTHeaderMain 
      header={Header()}
      main={Main({cells})}
    />
  )

  
}

function Header(){

  return (
    <header>
      <h1> Users Server Component </h1>
    </header>
  )
}

type Main = {
  cells:any,
}


function Main({cells}:Main){

  return <>
    <Section layout={'1'}>
      <Table 
        caption="Users"
        route="/users"
        headers={[
          'name',
          'email',
          'role',
          'account',
        ]}
        cells={cells}
      />
    </Section>
  </>
  
}