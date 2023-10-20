import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { getServerSession } from "next-auth"
import type { NextRequest } from "next/server"

export async function POST(req:NextRequest) {

  console.log('addToCart POST NEXT body: ')
  
  const request = await req.json()
  
  const {addToCartId, productId } = request
  

  const session = getServerSession(nextAuthOptions)

  try {
    // TODO haven't tried this yet!!!!
    const response = await keystoneContext.withSession(session).CartItem.addToCart({
      addToCartId,
      productId,
    })
  
    console.log('addToCart api route response: ', {response});
    
   
    // const data = await res.json()
   
    return Response.json({message: 'heyyyy boi'})
    
  } catch (error) {

    console.log('addToCart api route: ', error);

    throw new Error('addToCart api route Error')
    
  }
}