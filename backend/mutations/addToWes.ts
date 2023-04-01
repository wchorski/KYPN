// ! This is old keystone from Wes Bos

import { Context } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema";

export async function addToWes(
  root: any,
  {productId}: {productId: string},
  context: Context,
): Promise<CartItemCreateInput>{
  console.log('adding to carrtttt')
  const sesh = context.session
  if(!sesh.itemId){
    throw new Error('you must be logged in')
  }
  // query user, are they signed in?
  const allCartItems = await context.lists.CartItem.findMany({
    where: {user: {id: sesh.itemId}, product: {id: productId}}
  })

  const [existingCartItem] = allCartItems

  if(existingCartItem){
    console.log(`${existingCartItem.quantity} allready in cart ++item`);
    
    // query customer cart
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {quantity: existingCartItem.quantity + 1}
    })
  }

  // is item already in cart?
  // ++ item

  // make a new one if it's freshly added
  return await context.lists.CartItem.createOne({
    data: {
      product: {connect: {id: productId}},
      user: {connect: {id: sesh.itemId}}
    }
  })
}