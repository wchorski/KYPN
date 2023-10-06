'use client'
import ErrorMessage from "@components/ErrorMessage"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { Section } from "@components/layouts/Section"
import { useSession } from "@components/menus/Session"
import styles from '@styles/menus/dashboard.module.scss'
import Link from "next/link"
import { MdAutorenew, MdOutlineAccountBox, MdOutlineDownload, MdShop, } from "react-icons/md"
import { HiOutlineTicket } from "react-icons/hi"
import { Table } from "@components/elements/Table"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { gql } from "@apollo/client"
import { datePrettyLocalDay, datePrettyLocalTime } from "@lib/dateFormatter"
import { Booking } from "@lib/types"
import AccountDash from "@components/menus/AccountDash"

type Props = {
  searchParams:{
    dashState:'main'|'orders'|'subscriptions'|'downloads'|'tickets',
  }
  params:{id:string}
}

export default function AccountPage ({ params, searchParams }:Props) {

  const { dashState = 'main' } = searchParams
  
  // todo this is called on every nav click. is that bad?
  const {session, loading, error} = useSession()
  // console.log(session)

  if(loading) return <LoadingAnim />
  if(error) return <ErrorMessage error={error} />
  if(!session) return <p> Login to view account </p>

  return (
    <Section layout={'1_4'}>
      <nav className={styles.dashnav} >
        <ul>
          <li>
            <Link 
              href={'/account?dashState=main#main'}
              className={dashState === 'main' ? styles.linkactive : styles.dashlink}
            >
              Dashboard <MdOutlineAccountBox />
            </Link>
          </li>
          <li>
            <Link 
              href={'/account?dashState=orders#orders'}
              className={dashState === 'orders' ? styles.linkactive : styles.dashlink}
            >
              Orders <MdShop />
            </Link>
          </li>
          <li>
            <Link 
              href={'/account?dashState=subscriptions#subscriptions'}
              className={dashState === 'subscriptions' ? styles.linkactive : styles.dashlink}
            >
              Subscriptions <MdAutorenew />
            </Link>
          </li>
          <li>
            <Link 
              href={'/account?dashState=downloads#downloads'}
              className={dashState === 'downloads' ? styles.linkactive : styles.dashlink}
            >
              Downloads <MdOutlineDownload />
            </Link>
          </li>
          <li>
            <Link 
              href={'/account?dashState=tickets#tickets'}
              className={dashState === 'tickets' ? styles.linkactive : styles.dashlink}
            >
              Tickets <HiOutlineTicket />
            </Link>
          </li>
        </ul>
      </nav>

      <AccountDash dashState={dashState} userId={session.id}/>
    </Section>
  )
}
