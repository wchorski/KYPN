import { keystoneContext } from "@ks/context"
import type { Page } from "@ks/types"
import { getServerSession } from "next-auth"

import { nextAuthOptions } from "@/session"

export default async function fetchPage(slug: string, query: string) {
	try {
		const session = await getServerSession(nextAuthOptions)

		const page = (await keystoneContext
			.withSession(session)
			.query.Page.findOne({
				where: { slug: slug },
				query: query,
			})) as Page

		//!
		// const page = await keystoneContext.withSession(session).graphql.run({
		// 	query: `
		//     query Page($where: PageWhereInput!) {
		//       pages(where: $where) {
		//         id
		//         title
		//         content {
		//           document(
		//             componentBlocks: [
		//               {
		//                 component: "pricetable"
		//                 props: [
		//                   {
		//                     prop: "service"
		//                     fields: ["id", "name", "image"]
		//                   }
		//                 ]
		//               }
		//             ]
		//             relationships: {
		//               fields: ["id", "name", "image"]
		//             }
		//           )
		//         }
		//       }
		//     }
		//   `,
		// 	variables: {
		// 		where: {
		// 			slug: {
		// 				equals: slug,
		// 			},
		// 		},
		// 		// hydrateRelationships: true,
		// 	},
		// })
		// console.log("### fetchPage")
		// console.log({ page })

		return { page }
	} catch (error) {
		console.log("fetch Page: ", error)
		return { error }
	}
}

// ? don't include top "query getUser" on top
// if query direct from keystoneContext

// ? moved to the page
// const query = `

//     id
//     slug
//     title
//     template
//     dateCreated
//     dateModified
//     tags {
//       name
//     }
//     categories {
//       name
//     }
//     status
//     author{
//       id
//       name
//     }
//     content {
//       document
//     }
// `
