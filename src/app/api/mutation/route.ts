import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { User } from "@ks/types"
import { getServerSession } from "next-auth"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req:NextRequest) {

  const request = await req.json()
  // console.log({request});
  
  const { query, variables } = request
  
  try {
    const session = await getServerSession(nextAuthOptions)

    // todo figure out raw graphql queries through context
    const data = await keystoneContext.withSession(session).graphql.run({
      query: query,
      variables: variables
    })
    // console.log({data})
    
    // return Response.json(response)
    return NextResponse.json({
      ...data
    }, {
      status: 222
    })
    
  } catch (error) {

    console.log('graphql context protected ERROR: ', error);
    return NextResponse.json({
      error,
    }, {
      status: 555
    })
    
  }
}

// const query = `

//   mutation UpdateCartItem($where: CartItemWhereUniqueInput!, $data: CartItemUpdateInput!) {
//     updateCartItem(where: $where, data: $data) {
//       id
//       quantity
//     }
//   }

// `