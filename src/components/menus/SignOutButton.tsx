import styles from "@styles/elements/button.module.css"
import Link from "next/link"

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
		<p>
			<Link
				className={styles.signout}
				type="button"
				// onClick={e => handleSignout()}
				href="/api/auth/signout"
			>
        {' '}
				Sign Out
			</Link>
		</p>
	)
}

const MUTATION_SIGN_OUT = `
  mutation Mutation {
    endSession
  }
`
