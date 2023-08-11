import { AccountDetails } from "../components/menus/AccountDetails"
import { useUser } from "../components/menus/Session"


export default function Account() {

  const session = useUser()

  if (!session) return (
    <p> must be logged in to view </p>
  )
  
  return (
    <>
      <div className="container">
        <h1>Account | {session.name}</h1>

        <AccountDetails {...session} />
      </div>

    </>
  )
}
