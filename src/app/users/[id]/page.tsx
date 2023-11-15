import { envs } from '@/envs'
import ErrorMessage from '@components/ErrorMessage'
import { ImageDynamic } from '@components/elements/ImageDynamic'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { User } from '@ks/types'
import { fetchUserById } from '@lib/fetchdata/fetchUserById'
import Link from 'next/link'

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function UserByIdPage ({ params, searchParams }:Props) {

  const { id } = params

  const { user, error } = await fetchUserById(id)

  if(error) return <ErrorMessage error={error} />

  return (
    <PageTHeaderMain
      header={Header(user?.name)}
      main={Main(user)}
    />
  )
}

function Header(name?:string){

  return<header>
    <h1> User: {name} </h1>
  </header>
}

function Main(user?:User){

  if(!user) return <p> no user found </p>

  return<>
    <Section layout={'1_1'}>

      <ImageDynamic photoIn={user.image} alt={`profile thumbnail of user ${user.name}`}/>

      <ul className='unstyled' style={{lineHeight: '2rem', display: 'grid', gap: '1rem',}}>
        <li>
          <Link 
            href={envs.BACKEND_URL + `/users/${user.id}`}
            className={'button medium'} 
          >
            {user.name}'s account 
          </Link>
        </li>
        <li>
          <Link 
            href={envs.BACKEND_URL + `/subscription-items?!user_matches="${user.id}"`}
            className={'button medium'} 
          >
            Subscriptions 
          </Link>
        </li>
        <li>
          <Link 
            href={envs.BACKEND_URL + `/bookings?!customer_matches="${user.id}"`}
            className={'button medium'} 
          >
            Bookings 
          </Link>
        </li>
        <li>
          <Link 
            href={envs.BACKEND_URL + `/tickets?!holder_matches="${user.id}"`}
              className={'button medium'} 
            >        
            Tickets 
          </Link>
        </li>
        <li>
          <Link 
            href={envs.BACKEND_URL + `/orders?!user_matches="${user.id}"`}
              className={'button medium'} 
            >
            Orders 
          </Link>
        </li>
      </ul>
    </Section>
  </>
}