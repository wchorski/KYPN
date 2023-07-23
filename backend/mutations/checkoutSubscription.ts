// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from '@keystone-6/core';
import { Context } from '.keystone/types';
// import { relationship } from '@keystone-6/core/fields';
import stripeConfig from '../lib/stripe';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { CartItem } from '../types';

const IMG_PLACEHOLD = process.env.FRONTEND_URL + '/assets/product-placeholder.png'

export const checkoutSubscription = (base: BaseSchemaMeta) => graphql.field({
  type: base.object('SubscriptionItem'),

  args: { 
    custom_price: graphql.arg({ type: graphql.nonNull(graphql.Int) }),
    planId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    token: graphql.arg({ type: graphql.nonNull(graphql.String) }), 
    userId: graphql.arg({ type: graphql.nonNull(graphql.String) }), 
  },

  // 1. Make sure they are signed in
  async resolve(source, { planId, token, custom_price, userId }, context: Context) {

    try {

      //check if the user is logged in. If not, return an error
    const session = context.session;
    console.log('+++++ checkout subscription session ++++ ');
    // console.log(session);

    if (!session.itemId) {
      throw new Error('You must be logged in to create an sub order. :/ ');
    }

    const thePlan = await context.query.SubscriptionPlan.findOne({
      where: {id: planId},
      query: `
        id
        name
        price
        status
        stripeProductId
        stripePriceId
        billing_interval
        stockCount
      `
    })

    //Query the current user
    const user = await context.query.User.findOne({
      where: { id: session.itemId },
      query:
        `
          id
          name
          email
          stripeCustomerId
        `,
    })
    // console.log('===== FOUND USER')
    // console.log({ user })


    // 2. calc the total price for their order
    // const totalOrder = user.cart.reduce((accumulator: number, cartItem: CartItem) => {
    //   const amountCartItem = cartItem.quantity * cartItem.product.price
    //   return accumulator + amountCartItem
    // }, 0)



    // 3. create the charge with the stripe library
    // const charge = await stripeConfig.paymentIntents.create({
    //   amount: 11111,
    //   currency: 'USD',
    //   confirm: true,
    //   payment_method: token,
    //   metadata: {
    //     planName: 'error_name',
    //     planId: planId,
    //   }
    // }).catch((err: any) => {
    //   console.log(err);
    //   throw new Error(err.message);
    // });

    await stripeConfig.paymentMethods.attach(token, {
      customer: user?.stripeCustomerId,
    });

    const customer = await stripeConfig.customers.update(
      user?.stripeCustomerId,
      {
        metadata: {customdata: 'lol-wut'},
        invoice_settings: {
          default_payment_method: token
        }
      }
    ).catch((err:any) => {
      console.log('WHAT ERROR HUH????????');
      console.log(err);
    })
    console.log({customer});
    
    
    // const resStripe = await stripeConfig.subscriptions.create({
    //   customer: user?.stripeCustomerId || 'no_stripe_user_id',
    //   description: user?.name + ' | ' + user?.id,
    //   default_source: token,
    //   items: [
    //     { 
    //       price: thePlan?.stripePriceId,

    //       metadata: {
    //         subscriptionPlanId: thePlan?.id || 'no_sub_id',
    //         // todo get subscriptionItem Id. prob have to use afterOperation
    //         subscriptionPlanItemId: thePlan?.id|| 'no_item_id',
    //         subscriptionPlanName: thePlan?.name || 'no_sub_name',
    //       }, 
    //     },
    //   ],
    //   metadata: {
    //     subscriptionPlanId: thePlan?.id|| 'no_sub_id',
    //     subscriptionPlanName: thePlan?.name || 'no_sub_name',
    //   }
    // })
    // console.log(resStripe)
    // console.log(' --------- CHARGE MADE')


    // const now = new Date
    // const order = await context.db.SubscriptionItem.createOne({
    //   data: {
    //     custom_price: resStripe.amount,
    //     subscriptionPlan: { connect: { id: planId } },
    //     user: { connect: { id: user.id } },
    //     charge: resStripe.id,

    //     dateCreated: now.toISOString(),
    //     dateModified: now.toISOString(),
    //   },
    // })

    // return order
    return null
      
    } catch (error:any) {
      console.log('checkout subscription Error: ', error.message);
      
      throw error
    }
  
  }
})
