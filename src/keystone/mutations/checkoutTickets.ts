// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from '@keystone-6/core';
// @ts-ignore
import { Context } from '.keystone/types';
// import { relationship } from '@keystone-6/core/fields';
import stripeConfig from '../../lib/stripe';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';

const IMG_PLACEHOLD = process.env.FRONTEND_URL + '/assets/product-placeholder.png'
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS || 'no_admin_email@m.lan'

export const checkoutTickets = (base: BaseSchemaMeta) => graphql.field({
  type: base.object('Ticket'),

  args: { 
    chargeId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    eventId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    customerEmail: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    quantity: graphql.arg({ type: graphql.nonNull(graphql.Int) }),
    amount_total: graphql.arg({ type: graphql.nonNull(graphql.Int) }),
  },


  async resolve(source, { chargeId, eventId, quantity, customerEmail, amount_total }, context: Context) {

    //Query the current user
    const user = await context.query.User.findOne({
      where: { email: customerEmail },
      query:
        `
          id
          name
          email
        `,
    })
    
        
    const event = await context.query.Event.findOne({
      where: { id: eventId}
    })
    if(!event) throw new Error("No Event Found");



    //Create an order based on the cart item
    const ticketItems = Array.from({ length: quantity }, (_, index) => ({
      event: { connect: { id: eventId }},
      holder: (user) ? { connect: { id: user.id } } : null,
      cost: event.price,
      email: customerEmail,
      orderCount: `${index+1} of ${quantity}`
    }));
    // console.log({ ticketItems });


    const now = new Date
    const order = await context.db.Order.createOne({
      data: {
        total: amount_total,
        ticketItems: { create: ticketItems },
        user: (user) ? { connect: { id: user.id } } : null,
        charge: chargeId,
        dateCreated: now.toISOString(),
      },
    })

    //Clean up! Delete all cart items
    // await context.db.CartItem.deleteMany({
    //   where: user.cart.map((cartItem: CartItem) => { return { id: cartItem.id } })
    // })

    // todo SEND EMAIL
    // mailCheckoutReceipt(
    //   order.id, 
    //   [user.email, ADMIN_EMAIL_ADDRESS],
    //   user.name,
    //   ADMIN_EMAIL_ADDRESS,
    //   ticketItems,
    //   now.toISOString(),
    //   totalOrder,
    // )

    return { 
      status: 'success', 
      message: 'checkout tickets successful', 
      order,
      id: order.id,
    }
  }
})
