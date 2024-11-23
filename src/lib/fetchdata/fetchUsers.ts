import { keystoneContext } from "@ks/context"
import { User } from "@ks/types"
type Props = {
  query:string,
  page?:number,
  perPage?:number,
  session:any
}

export async function fetchUsers({query, page = 1, perPage = 25, session}:Props) {
	const variables = {
		skip: page * perPage - perPage,
		take: perPage,
		orderBy: [
			{
				name: "asc",
			},
		],
	}

	try {
		const users = (await keystoneContext
			.withSession(session)
			.query.User.findMany({
				query,
				// ...variables
			})) as User[]

		return { users }
	} catch (error) {
		console.log("!!! fetchUsers: ", error)
		return { error }
	}
}

