import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { getServerSession } from "next-auth"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req:NextRequest) {

  const request = await req.json()
  const { variables } = request
  
  try {
    const session = await getServerSession(nextAuthOptions)
    const data = await keystoneContext.withSession(session).graphql.run({
      query: query,
      variables: variables,
    }) as object

    return NextResponse.json({
      ...data
    }, {
      status: 222,
    })
    
  } catch (error) {

    console.log('!!! /api/addToCart route: ', error);
    return NextResponse.json({
      error
    }, {
      status: 555,
    })
    
  }
}

// ? complains when i query anything other than quantity.... idk why
const query = `
  mutation addToCart($addToCartId: ID!, $type: ID!, $productId: ID) {
    addToCart(id: $addToCartId, type: $type, productId: $productId) {
      quantity
    }
  }
`