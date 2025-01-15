import { keystoneContext } from "@ks/context"
import { Order } from "@ks/types"
import { Session } from "next-auth"

type Props = {
	id: string
	query: string
	session: Session|null
}

export async function fetchOrder({ id, query, session }: Props) {
	try {
		const order = (await keystoneContext
			.withSession(session)
			.query.Order.findOne({
				where: {
					id: id,
				},
				query: query,
			})) as Order

		return { order }
	} catch (error) {
		console.log("!!! fetchOrder: ", error)
		return { error }
	}
}
