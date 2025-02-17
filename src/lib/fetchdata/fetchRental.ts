import { Rental } from "@ks/types"
import { keystoneContext } from "@ks/context"
import { Session } from "next-auth"

type Props = {
	id: string
	query: string
	session: Session | null
}

export default async function fetchRental({ id, query, session }: Props) {
	try {
		const rental = (await keystoneContext
			.withSession(session)
			.query.Rental.findOne({
				query,
				where: {
					id,
				},
			})) as Rental

		return { rental }
	} catch (error) {
		// console.log('!!! fetch rental: ', error)
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
