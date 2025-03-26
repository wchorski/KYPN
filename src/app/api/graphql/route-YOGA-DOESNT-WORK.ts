import { createYoga } from "graphql-yoga"
import type { NextRequest} from "next/server";

import { keystoneContext } from "../../../keystone/context"

export const config = {
	api: {
		bodyParser: false,
	},
}

const handler = createYoga<{
	req: NextRequest
	// res: NextResponse
}>({
	graphqlEndpoint: "/api/graphql",
	schema: keystoneContext.graphql.schema,
	context: async req => keystoneContext,
	
})

export { handler as GET, handler as POST }
// export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
