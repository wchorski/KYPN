import { keystoneContext } from "@ks/context"
import { Event } from "@ks/types"
import { Session } from "next-auth"

export async function fetchEvent(
	id: string,
	query: string,
	session: Session | null
) {
	try {
		// todo if you add permissions on schema 'access' then you gotta add session here
		// const post = await keystoneContext.withSession(session).query.Post.findOne({
		const event = (await keystoneContext
			.withSession(session)
			.query.Event.findOne({
				query,
				where: {
					id: id,
				},
			})) as Event

		return { event }
	} catch (error) {
		return { error }
	}
}

// const query = `
//   categories {
//     id
//     name
//   }
//   categoriesCount
//   dateCreated
//   dateModified
//   hosts {
//     id
//     email
//     name
//   }
//   image
//   description {
//     document
//   }
//   excerpt
//   end
//   id
//   location {
//     address
//     name
//     id
//   }
//   price
//   seats
//   start
//   status
//   summary
//   tags {
//     id
//     name
//   }
//   tagsCount
//   ticketsCount
//   tickets{
//     id
//     status
//     holder {
//       id
//       name
//       email
//     }
//     event{
//       id
//       summary
//     }
//   }
// `
