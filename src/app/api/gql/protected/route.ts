import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { getServerSession } from "next-auth"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req:NextRequest) {

  const request = await req.json()
  const { query, variables } = request
  // console.log({query})
  // console.log({variables})
  
  try {
    const session = await getServerSession(nextAuthOptions)
    
    // todo figure out raw graphql queries through context
    const data = await keystoneContext.withSession(session).graphql.run({
      query: query,
      variables: variables
    }) as object
    
    return NextResponse.json({
      ...data
    }, {
      status: 222
    })
    
  } catch (error) {
    console.log('/api/gql/protected ERROR: ', error);
    return NextResponse.json({
      error,
    }, {
      status: 555
    })
    
  }
}