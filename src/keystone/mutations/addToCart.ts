// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql, config } from '@keystone-6/core';
// @ts-ignore
import { Context } from '.keystone/types';
// import { relationship } from '@keystone-6/core/fields';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';

export const addToCart = (base: BaseSchemaMeta) => graphql.field({
  type: base.object('CartItem'),
  args: { id: graphql.arg({ type: graphql.nonNull(graphql.ID) }), productId: graphql.arg({ type: graphql.ID }) },
  async resolve(source, { id, productId }, context: Context){
    console.log('****************** addToCart Mutation')
    const sesh = context.session    
    console.log({context});
    
        
    if(!sesh){
      throw new Error('!!!! you must be logged in')
    }
    const allCartItems = await context.db.CartItem.findMany({ where: { user: { id: { equals: sesh.itemId } }, product: { id: {equals: productId} } }})
    const [exisitingItem] = allCartItems

    if(exisitingItem){
      // console.log(`****** ${exisitingItem.quantity} exists in cart`);
      return await context.db.CartItem.updateOne({
        where: {id: exisitingItem.id},
        data: {
          quantity: exisitingItem.quantity+1, 
        }
      })
    }

    return await context.db.CartItem.createOne({
      data: {
        product: { connect: { id: productId }},
        user: { connect: { id: sesh.itemId }},
      },
    })
  }
})