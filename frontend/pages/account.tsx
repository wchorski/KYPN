// @ts-nocheck
import { useRouter } from "next/router"
import { AccountDetails } from "../components/menus/AccountDetails"
import { useUser } from "../components/menus/Session"
import Head from 'next/head'

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

export default function Account() {

  const session = useUser()
  const router = useRouter()
  

  if (!session) return (
    <p> must be logged in to view </p>
  )
  
  return (
    <>
      <Head>
        <title> Account | {SITE_TITLE} </title>
        <meta name="description"        content={'reference your account tickets, bookings, downloads, and more'} />
      </Head>
      <div className="container">
        <h1>Account | {session.name}</h1>

        {router.isReady && (
          <AccountDetails user={session} dashState={router.query.dashState}/>
        )}
      </div>

    </>
  )
}
