import { SubscriptionItem } from "@ks/types"
import { keystoneContext } from "@ks/context"
import { Session } from "next-auth"

type Props = {
	id: string
	query: string
	page?: number
	session: Session | null
}

export default async function fetchSubscriptionItem({ id, query, session }: Props) {
	try {
		const subscriptionItem = (await keystoneContext
			.withSession(session)
			.query.SubscriptionItem.findOne({
				where: { id },
				query,
			})) as SubscriptionItem

		return { subscriptionItem }
	} catch (error) {
		console.log("!!! fetchSubscriptionItem: ", error)
		return { error }
	}
}
