import { keystoneContext } from "@ks/context"
import type { Product } from "@ks/types"
import type { Session } from "next-auth"

import { envs } from "@/envs"

const perPage = envs.PERPAGE

type Props = {
	query: string
  page?: number
	session: Session | null
}

export default async function fetchProducts({ query, session, page = 1, }: Props) {
	try {
		const products = (await keystoneContext
			.withSession(session)
			.query.Product.findMany({
				
        skip: page * perPage - perPage,
			take: perPage,
				orderBy: [
					{
						dateCreated: "desc",
					},
				],
				query,
			})) as Product[]

		const count = (await keystoneContext
			.withSession(session)
			.query.Product.count()) as number

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

		return { products, count }
	} catch (error) {
		console.log("!!! fetchProducts: ", error)
		return { error }
	}
}
