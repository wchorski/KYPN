// import { useGlobalContext } from "../lib/useSessionContext"
import { gql, useMutation } from "@apollo/client"
// import { useRouter } from "next/navigation"
import { QUERY_USER_CURRENT } from "./Session"
import styles from '@styles/elements/button.module.scss'
import { wait } from "@lib/waitTimeout"

export default function SignOutButton() {

  // const [signOut, { data, loading, error }] = useMutation(MUTATION_SIGN_OUT)
  // const {setSession} = useGlobalContext()
  // const router = useRouter()

  async function handleSignout() {

    // try {
    //   const resGQL = await signOut({
    //     refetchQueries: [{ query: QUERY_USER_CURRENT }],
    //   })
    //   console.log(resGQL)

    //   const resAuth = await fetch(`/api/auth`, {
    //     method: 'DELETE',
    //   })

    //   const dataAuth = await resAuth.json()
    //   console.log(dataAuth)

    //   router.refresh()
    //   router.push(`/auth?state=signout`)

    //   // todo hacky way to get this to work. but it works for now
    //   await wait(1000)
      
    //   window.location.reload()

    // } catch (error) {
    //   console.log(error)

    // }


    // TODO temporary fix
    //@ts-ignore
    // setSession({})

    // localStorage.removeItem('session')

  }

  return (
    <a
      className={styles.signout}
      type="button "
      // onClick={e => handleSignout()}
      href="/api/auth/signout"
    >
      Sign Out
    </a>
  )
}


const MUTATION_SIGN_OUT = gql`
  mutation Mutation {
    endSession
  }
`