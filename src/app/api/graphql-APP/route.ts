// cred - https://github.com/keystonejs/keystone/discussions/8863#discussioncomment-7363649
// cred - https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-nextjs
import { getServerSession } from 'next-auth/next'
import { cookies, headers } from 'next/headers'
import type { Context } from '.keystone/types'
import { createYoga } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';
import { keystoneContext } from '@ks/context';
import { NextRequest } from 'next/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
// TODO attempting to convert 'pages' api route to 'app' route
// TODO giving up on this again...
/*
  An example of how to setup your own yoga graphql server
  using the generated Keystone GraphQL schema.
*/
export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const { handleRequest } = createYoga<{
    req: NextApiRequest;
    res: NextApiResponse;
  }>({
  graphqlEndpoint: '/api/graphql',
  schema: keystoneContext.graphql.schema,
  fetchAPI: {
    Request: Request,
    Response: Response,
  },
  context: ({ req, res }) => keystoneContext.withRequest(req, res),
})

export { handleRequest as GET, handleRequest as POST };