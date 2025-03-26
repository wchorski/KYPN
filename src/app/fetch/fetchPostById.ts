import { keystoneContext } from "@ks/context"
import type {  Post  } from "@ks/types"
type Props = {
	query: string
	id: string
	session: any
}

export async function fetchPostById({ query, id, session }: Props) {
	try {
		const post = (await keystoneContext
			.withSession(session)
			.query.Post.findOne({
				query,
				where: {
					id,
				},
				// ...variables
			})) as Post

		return { post }
	} catch (error) {
		console.log("!!! fetchPostById: ", error)
		return { error }
	}
}
