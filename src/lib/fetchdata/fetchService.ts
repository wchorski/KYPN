import { Service } from "@ks/types"
import { keystoneContext } from "@ks/context"

type Props = {
	id: string
	query: string
	session: any
}

export default async function fetchService({ id, query, session }: Props) {
	try {
		const service = (await keystoneContext
			.withSession(session)
			.query.Service.findOne({
				where: { id },
				query,
			})) as Service

		return { service }
	} catch (error) {
		console.log("!!! fetch Service by id: ", error)
		return { error }
	}
}
