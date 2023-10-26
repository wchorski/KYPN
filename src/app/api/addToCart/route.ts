import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { getServerSession } from "next-auth"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req:NextRequest) {

  console.log('addToCart POST NEXT body: ')
  const request = await req.json()
  const { variables } = request
  
  try {
    const session = await getServerSession(nextAuthOptions)
    const response = await keystoneContext.withSession(session).graphql.run({
      query: query,
      variables: variables,
    })
  
    // const data = await res.json()
    return NextResponse.json(response)
    
  } catch (error) {

    console.log('addToCart api route: ', error);
    throw new Error('addToCart api route Error')
    
  }
}

const query = `
  mutation addToCart($addToCartId: ID!, $productId: ID) {
    addToCart(id: $addToCartId, productId: $productId) {
      id
      quantity
      product {
        name
      }
    }
  }
`