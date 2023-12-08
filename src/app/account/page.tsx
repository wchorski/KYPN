import { Section } from "@components/layouts/Section"
import Link from "next/link"
import { MdAutorenew, MdOutlineAccountBox, MdOutlineDownload, MdShop, } from "react-icons/md"
import { HiOutlineTicket } from "react-icons/hi"
import AccountDash from "@components/menus/AccountDash"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { User } from "@ks/types"
import { LoginToView } from "@components/menus/LoginToView"
import fetchTicketsByUser from "@lib/fetchdata/fetchTicketsByUser"
import styles from '@styles/menus/dashboard.module.scss'
import { Metadata } from "next"
import { envs } from "@/envs"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"

export const metadata: Metadata = {
  title: 'Account | ' + envs.SITE_TITLE,
  description: 'dashboard for orders, subscriptions, bookings, tickets, downloads',
}

type Props = {
  searchParams:{
    dashState:'main'|'orders'|'subscriptions'|'downloads'|'tickets',
  }
  params:{id:string}
}

export default async function AccountPage ({ params, searchParams }:Props) {

  const { dashState = 'main' } = searchParams
  
  const session = await getServerSession(nextAuthOptions)
  if(!session) return <LoginToView />

  const user = await keystoneContext.withSession(session).query.User.findOne({
    // TODO have pagination in mind (or maybe by date filtering?)
    where: {
      id: session.itemId,
    },
    query: USER_DASH_QUERY,
  }) as User

  const {tickets, error } = await fetchTicketsByUser(user?.id)
  
  return <main>
    <header >
      <Section layout={'1'}>
        <h1 style={{display: 'none'}}> Account </h1>

        {!session.data.role && (
          <VerifyEmailCard email={user.email} />
        )}
        
      </Section>
    </header>

    <Section layout={'1_4'}>
  

        {/* <h2>{session?.user?.name}</h2> */}

        <nav className={styles.dashnav} >
          <ul>
            <li>
              <Link 
                // href={'/account#main'}
                href={'/account?dashState=main#main'}
                className={dashState === 'main' ? styles.linkactive : styles.dashlink}
              >
                Dashboard <MdOutlineAccountBox />
              </Link>
            </li>
            <li>
              <Link 
                // href={'/account#orders'}
                href={'/account?dashState=orders#orders'}
                className={dashState === 'orders' ? styles.linkactive : styles.dashlink}
              >
                Orders <MdShop />
              </Link>
            </li>
            <li>
              <Link 
                // href={'/account#subscriptions'}
                href={'/account?dashState=subscriptions#subscriptions'}
                className={dashState === 'subscriptions' ? styles.linkactive : styles.dashlink}
              >
                Subscriptions <MdAutorenew />
              </Link>
            </li>
            <li>
              <Link 
                // href={'/account#downloads'}
                href={'/account?dashState=downloads#downloads'}
                className={dashState === 'downloads' ? styles.linkactive : styles.dashlink}
              >
                Downloads <MdOutlineDownload />
              </Link>
            </li>
            <li>
              <Link 
                // href={'/account#tickets'}
                href={'/account?dashState=tickets#tickets'}
                className={dashState === 'tickets' ? styles.linkactive : styles.dashlink}
              >
                Tickets <HiOutlineTicket />
              </Link>
            </li>
          </ul>
        </nav>

    
      <AccountDash dashState={dashState} user={user} tickets={tickets} />
    </Section>
  </main>
}

const USER_DASH_QUERY = `
  id
  name
  email
  phone
  bookings {
    id
    price
    start
    service {
      name
    }
    status
  }
  subscriptions{
    id
    subscriptionPlan {
      id
      name
    }
    status
    dateModified
    dateCreated
  }
  orders{
    id
    total
    items{
      quantity
    }
    dateCreated
  }
  tickets {
    id
    orderCount
    status
    event {
      id
      start
      summary
      location {
        id
        name
      }
    }
  }

`