import { useGlobalContext } from "@/lib/useSessionContext"
import { gql, useMutation } from "@apollo/client"
import { QUERY_USER_CURRENT } from "./Session"

export default function SignOutButton() {

  const [signOut, {data, loading, error}] = useMutation(MUTATION_SIGN_OUT)
  const {setSession} = useGlobalContext()

  async function handleSignout(){

    const res = await signOut({
      refetchQueries: [{query: QUERY_USER_CURRENT}],
    })

    console.log(res);

    // TODO temporary fix
    //@ts-ignore
    setSession({})
    
  } 

  return (
    <button 
      type="button"
      onClick={e => handleSignout()}
    > 
      Sign Out 
    </button>
  )
}


const MUTATION_SIGN_OUT = gql`
  mutation Mutation {
    endSession
  }
`