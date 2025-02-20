import { Addon, SubscriptionPlan } from "@ks/types"
import { keystoneContext } from "@ks/context"
import { Session } from "next-auth"

type Props = {
	id: string
	query: string
	page?: number
	session: Session | null
}

export default async function fetchSubscriptionPlan({ id, query, session }: Props) {
	try {
		const subscriptionPlan = (await keystoneContext
			.withSession(session)
			.query.SubscriptionPlan.findOne({
				where: { id },
				query,
			})) as SubscriptionPlan

		return { subscriptionPlan }
	} catch (error) {
		console.log("!!! fetchSubscriptionPlan: ", error)
		return { error }
	}
}
