// cred - https://next-auth.js.org/tutorials/securing-pages-and-api-routes
import { keystoneContext } from "@ks/context"
import type { NextRequest} from "next/server";
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

import { nextAuthOptions } from "@/session"

export async function POST(req: NextRequest) {
	const request = await req.json()
	const { query, variables } = request
	// console.log({query})
	// console.log({variables})

	try {
		const session = await getServerSession(nextAuthOptions)

		const data = (await keystoneContext.withSession(session).graphql.run({
			query: query,
			variables: variables,
		})) as object

		return NextResponse.json({ ...data }, { status: 222 })
	} catch (error) {
		console.log("!!! /api/gql/protected ERROR: ", error)
		return NextResponse.json({ error }, { status: 555 })
	}
}
