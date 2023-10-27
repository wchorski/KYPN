// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from '@keystone-6/core';
// @ts-ignore
import { Context } from '.keystone/types';
// import { relationship } from '@keystone-6/core/fields';
import stripeConfig from '../../lib/stripe';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { CartItem, Product } from '../types';
import { mailCheckoutReceipt } from '../../lib/mail';
import { calcTotalPrice } from '../../lib/calcTotalPrice';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../../session';

const IMG_PLACEHOLD = process.env.FRONTEND_URL + '/assets/product-placeholder.png'
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS || 'no_admin_email@m.lan'

export const checkout = (base: BaseSchemaMeta) => graphql.field({
  type: base.object('CartItem'),

  args: { 
    chargeId: graphql.arg({ type: graphql.nonNull(graphql.String) }) 
  },

  // 1. Make sure they are signed in
  async resolve(source, { chargeId }, context: Context) {
    //check if the user is logged in. If not, return an error
    console.log('+++++ checkout session ++++ ');
    
    const session = await getServerSession(nextAuthOptions)
    // const session = context.session;
    console.log('+++++ checkout session 2 ++++ ');
    
    if (!session?.itemId) {
      console.log('!!! no session found');
      
      throw new Error('You must be logged in to create an order. :/ ');
    }

    console.log('+++++ checkout session 3 ++++ ');

    //Query the current user
    const user = await context.query.User.findOne({
      where: { id: session.itemId },
      query:
        `
          id
          name
          email
          orders {
            id
          }
          cart {
            id
            quantity
            product {
              id
              name
              price
              stockCount
              image
            }
          }
        `,
    })
    // console.log('===== FOUND USER')
    // console.log({ user })

    // ? i check this before webhook
    // const currCart = await Promise.all(user.cart.map( async (item:CartItem) => {
    //   try {
    //     if(item.quantity > item.product.stockCount){
    //       throw new Error(`Insufficent Stock for ${item.product.name}. Only ${item.product.stockCount} available`);
          
    //     } 
        
    //   } catch (error) {
    //     console.error('!!!! checkout ERROR: ', error);
    //     throw new Error(`Checkout Error: ${error}`);
    //   }
    // }))
    
    // 2. calc the total price for their order
    // const totalOrder = user.cart.reduce((accumulator: number, cartItem: CartItem) => {
    //   const amountCartItem = cartItem.quantity * cartItem.product.price
    //   return accumulator + amountCartItem
    // }, 0)



    // // 3. create the charge with the stripe library

    // // TODO using stripe hosted form from next front end 
    // const charge = await stripeConfig.paymentIntents.create({
    //   amount: totalOrder,
    //   currency: 'USD',
    //   confirm: true,
    //   payment_method: token,
    // }).catch((err: any) => {
    //   console.log(err);
    //   throw new Error(err.message);
    // });
    // console.log(charge)
    // console.log('CHARGE MADE')

    // console.log('===== HEYYYYYYYYYYYYYYYYYYY')

    //Create an order based on the cart item
    const orderItems = user.cart.map((cartItem: CartItem) => {

      return {
        name: cartItem.product.name,
        description: cartItem.product.description,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
        image: cartItem.product.image,
        product: { connect: { id: cartItem.product.id }}
        // productId: cartItem.product.id,
        // photo: { connect: { id: cartItem.product.photo.id } },
      }

    })
    
    const now = new Date
    const order = await context.db.Order.createOne({
      data: {
        total: calcTotalPrice(user.cart),
        items: { create: orderItems },
        user: { connect: { id: user.id } },
        charge: chargeId,

        createdAt: now.toISOString(),
      },
    })
    console.log({order});
    

    //Clean up! Delete all cart items
    await context.db.CartItem.deleteMany({
      where: user.cart.map((cartItem: CartItem) => { return { id: cartItem.id } })
    })

    console.log('---- CART ITEMS DELETED');
    

    // mailCheckoutReceipt(
    //   order.id, 
    //   [user.email, ADMIN_EMAIL_ADDRESS],
    //   user.name,
    //   ADMIN_EMAIL_ADDRESS,
    //   orderItems,
    //   now.toISOString(),
    //   totalOrder,
    // )

    // return order
    return { status: 'success'}
  }
})


function handleMail(){

}