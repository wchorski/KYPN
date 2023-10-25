import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { gql } from "graphql-request"
import { getServerSession } from "next-auth"
import type { NextRequest } from "next/server"

export async function POST(req:NextRequest) {

  console.log('addToCart POST NEXT body: ')
  const request = await req.json()
  const {addToCartId, productId } = request
  const session = getServerSession(nextAuthOptions)

  try {
    const response = await keystoneContext.withSession(session).graphql.run({
      query: query,
      variables: {
        addToCartId,
        productId,
      }
    })
  
    console.log('addToCart api route response: ', {response});
    // const data = await res.json()
    return Response.json({message: 'heyyyy boi'})
    
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