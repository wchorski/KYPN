// cred - https://next-auth.js.org/tutorials/securing-pages-and-api-routes
import { nextAuthOptions } from "@/session"
import { getServerSession } from "next-auth/next"
import { keystoneContext } from "@ks/context"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  
  if (req.method === 'POST') {
    const request = await req.body
    const { query, variables } = request    
    
    try {
      // todo idk next-auth still works
      //@ts-ignore
      const session = await getServerSession(req, res, nextAuthOptions)

      const data = await keystoneContext.withSession(session).graphql.run({
        query: query,
        variables: variables
      }) as object
      
      res.status(222).json({...data})
      
    } catch (error) {
      console.log('!!! /api/gql/protected ERROR: ', error);
      res.status(555).json({error})
    }
  } else {
    res.status(405).json({message: '!!! req type not allowed'})
  }
}

//? how it would be done in /src/app/api/gql/protected/route.ts
// export async function POST(req:NextRequest) {

//   const request = await req.json()
//   const { query, variables } = request
//   // console.log({query})
//   // console.log({variables})
  
//   try {
//     const session = await getServerSession(nextAuthOptions)
    
//     // todo figure out raw graphql queries through context
//     const data = await keystoneContext.withSession(session).graphql.run({
//       query: query,
//       variables: variables
//     }) as object
    
//     return NextResponse.json({
//       ...data
//     }, {
//       status: 222
//     })
    
//   } catch (error) {
//     console.log('/api/gql/protected ERROR: ', error);
//     return NextResponse.json({
//       error,
//     }, {
//       status: 555
//     })
    
//   }
// }