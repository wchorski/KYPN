// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from '@keystone-6/core';
import { Context } from '.keystone/types';
// import { relationship } from '@keystone-6/core/fields';
import stripeConfig from '../lib/stripe';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { CartItem } from '../types';

const IMG_PLACEHOLD = process.env.FRONTEND_URL + '/assets/product-placeholder.png'

export const checkout = (base: BaseSchemaMeta) => graphql.field({
  type: base.object('CartItem'),

  args: { token: graphql.arg({ type: graphql.nonNull(graphql.String) }) },

  // 1. Make sure they are signed in
  async resolve(source, { token }, context: Context) {
    //check if the user is logged in. If not, return an error
    const session = context.session;
    console.log('+++++ checkout session ++++ ');
    // console.log(session);

    if (!session.itemId) {
      throw new Error('You must be logged in to create an order. :/ ');
    }

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
              description
              photo {
                id
              }
            }
          }
        `,
    })
    // console.log('===== FOUND USER')
    // console.log({ user })


    // 2. calc the total price for their order
    const totalOrder = user.cart.reduce((accumulator: number, cartItem: CartItem) => {
      const amountCartItem = cartItem.quantity * cartItem.product.price
      return accumulator + amountCartItem
    }, 0)



    // 3. create the charge with the stripe library

    const charge = await stripeConfig.paymentIntents.create({
      amount: totalOrder,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    }).catch((err: any) => {
      console.log(err);
      throw new Error(err.message);
    });
    // console.log(charge)
    // console.log('CHARGE MADE')

    console.log('===== HEYYYYYYYYYYYYYYYYYYY')

    //Create an order based on the cart item
    const orderItems = user.cart.map((cartItem: CartItem) => {

      // console.log(cartItem.product);

      // const user = await context.query.User.findOne({
      //   where: { id: session.itemId },
      //   query: `id
      //         }`,
      // })

      if (cartItem.product?.photo?.id) return {
        name: cartItem.product.name,
        description: cartItem.product.description,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
        // productId: cartItem.product.id,
        photo: { connect: { id: cartItem.product.photo.id } },
      }



      return {
        name: cartItem.product.name,
        description: cartItem.product.description,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
        // productId: cartItem.product.id,
        // photo: { connect: { id: cartItem.product.photo.id } },
      }

    })

    console.log({ orderItems });



    const now = new Date
    const order = await context.db.Order.createOne({
      data: {
        total: charge.amount,
        items: { create: orderItems },
        user: { connect: { id: user.id } },
        charge: charge.id,

        createdAt: now.toISOString(),
      },
    })

    //Clean up! Delete all cart items
    await context.db.CartItem.deleteMany({
      where: user.cart.map((cartItem: CartItem) => { return { id: cartItem.id } })
    })
    return order
  }
})
