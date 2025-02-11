import { Addon, Product, Service, SubscriptionPlan } from "@ks/types"
import { keystoneContext } from "@ks/context"
import { Session } from "next-auth"
import { envs } from "@/envs"

const perPage = envs.PERPAGE

type Props = {
	query: string
	page?: number
	session: Session | null
}

export default async function fetchSubscriptonPlans({
	query,
	session,
	page = 1,
}: Props) {
	try {
		const subscriptionPlans = (await keystoneContext
			.withSession(session)
			.query.SubscriptionPlan.findMany({
				skip: page * perPage - perPage,
				take: perPage,
				orderBy: [
					{
						dateCreated: "desc",
					},
				],
				query,
			})) as SubscriptionPlan[]

		const count = (await keystoneContext
			.withSession(session)
			.query.SubscriptionPlan.count()) as number

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

		return { subscriptionPlans, count }
	} catch (error) {
		console.log("!!! fetchSubscriptionPlans: ", error)
		return { error }
	}
}
