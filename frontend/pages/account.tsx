// @ts-nocheck
import { useRouter } from "next/router"
import { AccountDetails } from "../components/menus/AccountDetails"
import { useUser } from "../components/menus/Session"


export default function Account() {

  const session = useUser()
  const router = useRouter()
  

  if (!session) return (
    <p> must be logged in to view </p>
  )
  
  return (
    <>
      <div className="container">
        <h1>Account | {session.name}</h1>

        {router.isReady && (
          <AccountDetails user={session} dashState={router.query.dashState}/>
        )}
      </div>

    </>
  )
}
