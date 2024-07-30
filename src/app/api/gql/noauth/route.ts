import { keystoneContext } from "@ks/context"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	const request = await req.json()
	const { query, variables } = request
	// console.log({query})
	// console.log({variables})

	try {
		// todo figure out raw graphql queries through context
		const data = (await keystoneContext.graphql.run({
			query: query,
			variables: variables,
		})) as object

		return NextResponse.json(
			{
				...data,
			},
			{
				status: 222,
			}
		)
	} catch (error) {
		console.log("/api/gql/noauth ERROR: ", error)
		return NextResponse.json(
			{
				error,
			},
			{
				status: 555,
			}
		)
	}
}
