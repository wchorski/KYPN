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
    chargeId: graphql.arg({ type: graphql.nonNull(graphql.String) }), 
    customerEmail: graphql.arg({ type: graphql.nonNull(graphql.String) }),
  },

  // 1. Make sure they are signed in
  async resolve(source, { chargeId, customerEmail }, context: Context) {

    //Query the current user
    const user = await context.query.User.findOne({
      where: { email: customerEmail },
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
    if(!user) throw new Error(`!!! checkout, No user Found with email: ${customerEmail}`)


    if(user.cart.length <= 0) throw new Error('!!! No cart items found')
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
        dateCreated: now.toISOString(),
        // todo make logic that handles open, expired, unpaid, no_payment states
        status: 'COMPLETE',
        payment_status: 'PAID',
      },
    })
    // console.log({order});
    

    //Clean up! Delete all cart items
    await context.db.CartItem.deleteMany({
      where: user.cart.map((cartItem: CartItem) => { return { id: cartItem.id } })
    })

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
    return { 
      status: 'success', 
      message: 'checkout successful', 
      order
    }
  }
})


function handleMail(){

}