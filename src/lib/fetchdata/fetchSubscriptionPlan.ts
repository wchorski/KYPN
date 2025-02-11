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

		// const addons = (await keystoneContext
		//   .withSession(session)
		//   .query.Addon.findMany({
		//     where: {
		//       // status: {
		//       //   notIn: ["DRAFT", "PRIVATE"]
		//       // },
		//       // include ids filtering if array is present
		//       ...(addonIds && addonIds.length > 0 ? { id: { in: addonIds } } : {}),
		//     },
		//     orderBy: [
		//       {
		//         dateCreated: "desc",
		//       },
		//     ],
		//     query: queryAddons,
		//   })) as Addon[]

		return { subscriptionPlan }
	} catch (error) {
		console.log("!!! fetchSubscriptionPlan: ", error)
		return { error }
	}
}
