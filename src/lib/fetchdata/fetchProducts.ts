import { Addon, Product, Service } from "@ks/types"
import { keystoneContext } from "@ks/context"
import { Session } from "next-auth"

type Props = {
	query: string
	session: Session | null
}

export default async function fetchProducts({
	query,
	session,
}: Props) {
	try {
		const products = (await keystoneContext
			.withSession(session)
			.query.Product.findMany({
				// where: {

				// },
				orderBy: [
					{
						dateCreated: "desc",
					},
				],
				query,
			})) as Product[]

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

		return { products }
	} catch (error) {
		console.log("!!! fetchProducts: ", error)
		return { error }
	}
}
