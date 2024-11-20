import { keystoneContext } from "@ks/context"
import { User } from "@ks/types"

// ? query from yoga client
export async function fetchUser(id: string, session: any) {
	try {
		const user = (await keystoneContext
			.withSession(session)
			.query.User.findOne({
				where: { id },
				query: q_user,
			})) as User

		return { user }

	} catch (error) {
		console.log("!!! fetchUser: ", error)
		return { error }
	}
}

const q_user = `
  id
  name
  email
  role {
    name
  }
`
