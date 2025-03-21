import { keystoneContext } from "@ks/context"
import type { Addon } from "@ks/types"

type Props = {
	id: string
	query: string
	session: any
}

export default async function fetchAddon({ id, query, session }: Props) {
	try {
		const addon = (await keystoneContext
			.withSession(session)
			.query.Addon.findOne({
				where: { id },
				query,
			})) as Addon

		return { addon }
	} catch (error) {
		console.log("!!! fetch Addon by id: ", error)
		return { error }
	}
}
