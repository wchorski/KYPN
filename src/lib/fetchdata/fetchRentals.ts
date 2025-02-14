import { Rental } from "@ks/types"
import { keystoneContext } from "@ks/context"
import { Session } from "next-auth"

type Props = {
	dateSelectedString: string
	query: string
	session: Session | null
}

export default async function fetchRentals({
	dateSelectedString,
	query,
	session,
}: Props) {
	const dateSelected = new Date(dateSelectedString)

	try {
		const rentals = (await keystoneContext
			.withSession(session)
			.query.Rental.findMany({
				query,
				where: {
					end: {
						gte: dateSelected.toISOString(),
						lt: new Date(
							dateSelected.getFullYear(),
							dateSelected.getMonth() + 24
						).toISOString(),
					},

					customer: { id: { equals: session?.itemId || "no_session_id" } },

					// AND: [
					// 	{
					// 		start: {
					// 			gte: dateSelected.toISOString(),
					// 			lt: new Date(
					// 				dateSelected.getFullYear(),
					// 				dateSelected.getMonth() + 24
					// 			).toISOString(),
					// 		},
					// 	},
					// 	{
					// 		customer: { id: { equals: session?.itemId || "no_session_id" } },
					// 	},
					// ],
				},
				orderBy: [
					{
						start: "asc",
					},
				],
			})) as Rental[]

		// const count = await keystoneContext.withSession(session).query.Rental.count({
		//   where: {
		//     AND: [
		//       {
		//         start: {
		//           gte: dateSelected.toISOString(),
		//           lt: new Date(dateSelected.getFullYear(), dateSelected.getMonth() + 24).toISOString()
		//         },
		//       },
		//     ]
		//   },
		// }) as number

		return { rentals }
	} catch (error) {
		// console.log('!!! fetch rentals: ', error)
		return { error }
	}
}

// const query = `
//   typeof
//   id
//   summary
//   start
// `;
// email
// phone
// name
// dateCreated
// dateModified
// addonsCount
// end
// google
// status
// notes
// price
// addons {
//   id
//   excerpt
//   name
//   price
// }
// customer {
//   id
//   email
//   phone
//   name
//   nameLast
// }
// employees {
//   id
//   name
//   email
//   image
// }
// location {
//   id
//   name
//   address
// }
// service {
//   id
//   name
// }
