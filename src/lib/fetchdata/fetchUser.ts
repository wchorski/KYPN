import { keystoneContext } from "@ks/context"
import { User } from "@ks/types"
import { Session } from "next-auth"

// ? query from yoga client
export async function fetchUser(
	id: string,
	query: string,
	session: Session | null
) {

	try {
		const user = (await keystoneContext
			.withSession(session)
			.query.User.findOne({
				where: { id },
				query
			})) as User

		return { user }
	} catch (error) {
		console.log("!!! fetchUser: ", error)
		return { error }
	}
}
