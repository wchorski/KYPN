import { Addon, Product, Service } from "@ks/types"
import { keystoneContext } from "@ks/context"
import { Session } from "next-auth"
import { envs } from "@/envs"

const perPage = envs.PERPAGE

type Props = {
	id: string
	query: string
	page?: number
	session: Session | null
}

export default async function fetchProduct({ id, query, session }: Props) {
	try {
		const product = (await keystoneContext
			.withSession(session)
			.query.Product.findOne({
				where: { id },
				query,
			})) as Product

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

		return { product }
	} catch (error) {
		console.log("!!! fetchProduct: ", error)
		return { error }
	}
}
