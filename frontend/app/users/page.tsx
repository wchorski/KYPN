'use client'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import ErrorMessage from '@components/ErrorMessage'
import { LoadingAnim } from '@components/elements/LoadingAnim'
import { Table } from '@components/elements/Table'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { envvars } from '@lib/envvars'
import { fetchUsers } from '@lib/fetchdata/fetchUsers'
import { User } from '@lib/types'
import { ReactNode } from 'react'
  
type Props = {
  children:ReactNode
}

const page = 1
const perPage = envvars.PERPAGE

export default function UsersPage ({ children }:Props) {

  // const { users, error } = await fetchUsers()
  const {data, error, loading} = useQuery(query, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          name: 'asc'
        }
      ]
    },
  })
  console.log(data);
  

  if(loading) return <LoadingAnim />
  if(error) return <ErrorMessage error={error} />
  if(!data?.users) return <p> no users found </p>

  const cells = data.users.map((user:User) => ({
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
      <h1> Users </h1>
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

const query = gql`
  query Users($take: Int, $skip: Int!, $orderBy: [UserOrderByInput!]!) {
    usersCount
    users(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      name
      nameLast
      email
      role {
        name
      }
    }
  }
`