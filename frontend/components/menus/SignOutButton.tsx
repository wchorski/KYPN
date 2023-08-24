// import { useGlobalContext } from "../lib/useSessionContext"
import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { QUERY_USER_CURRENT } from "./Session"

export default function SignOutButton() {

  const [signOut, { data, loading, error }] = useMutation(MUTATION_SIGN_OUT)
  // const {setSession} = useGlobalContext()
  const router = useRouter()

  async function handleSignout() {

    try {
      const res = await signOut({
        refetchQueries: [{ query: QUERY_USER_CURRENT }],
      })
      console.log(res)

      router.push(`/auth/signout`)

    } catch (error) {
      console.log(error)

    }


    // TODO temporary fix
    //@ts-ignore
    // setSession({})

    // localStorage.removeItem('session')

  }

  return (
    <a
      type="button "
      onClick={e => handleSignout()}
      style={{
        background: 'var(--c-dark)',
        color: 'var(--c-txt-rev)',
        borderRadius: 'var(--br-dull)'
      }}
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