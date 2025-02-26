import { Addon } from "@ks/types"
import { keystoneContext } from "@ks/context"

type Props = {
	query: string
	session: any
	ids?: string[]
}

export default async function fetchAddons({ ids, session, query }: Props) {
	try {
		if (ids && ids.length <= 0) return { addons: [] }

		const addons = (await keystoneContext
			.withSession(session)
			.query.Addon.findMany({
				...(ids && ids.length > 0
					? {
							where: {
								id: {
									in: ids,
								},
							},
					  }
					: {}),
				query,
			})) as Addon[]

		return { addons }
	} catch (error) {
		console.log("!!! fetch Addon by id: ", error)
		return { error }
	}
}
