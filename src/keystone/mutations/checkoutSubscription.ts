// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from '@keystone-6/core';
// @ts-ignore
import { Context } from '.keystone/types';
// import { relationship } from '@keystone-6/core/fields';
import stripeConfig from '../../lib/stripe';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { CartItem } from '../types';

const IMG_PLACEHOLD = process.env.FRONTEND_URL + '/assets/product-placeholder.png'

type SubPlan = {
  status?:'DRAFT'|'AVAILABLE'|'OUT_OF_STOCK'
}

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
          stockMax
        `
      })

      const activeSubsCount = await context.query.SubscriptionItem.count({
        
        where: {
          subscriptionPlan: {
            id: {
              equals: thePlan.id
            }
          },
          NOT: [
            {
              status: {
                equals: "CANCELED"
              }
            },
            {
              status: {
                equals: "EXPIRED"
              }
            }
          ]
        }
      })
      // console.log(' ==== subitem count on this plan ');
      // console.log(thePlan.items);

      const newPlanData:SubPlan = {}

      if(activeSubsCount === thePlan.stockMax) newPlanData.status = 'OUT_OF_STOCK'
      if(activeSubsCount > thePlan.stockMax) throw new Error("Item is out of stock");
      

      // const SubItemCount = await context.query.SubscriptionItem.count({
      //     where: {
      //       NOT: [
      //         {
      //           status: {
      //             equals: "CANCELED"
      //           }
      //         },
      //         {
      //           status: {
      //             equals: "EXPIRED"
      //           }
      //         }
      //       ]
      //     },
      // })

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

      if(token){
        await stripeConfig.paymentMethods.attach(
          token, 
          { customer: user?.stripeCustomerId,}
        );
    
        const customer = await stripeConfig.customers.update(
          user?.stripeCustomerId,
          {
            metadata: {userId: user?.id},
            invoice_settings: {
              default_payment_method: token
            }
          }
        ).catch((err:any) => {
          console.log('!!!! User payment update failed');
          console.log(err);
        })
      }
      // console.log({customer});
      
      const resStripe = await stripeConfig.subscriptions.create({
        customer: user?.stripeCustomerId || 'no_stripe_user_id',
        description: user?.name + ' | ' + user?.id,
        // default_source: token,
        items: [
          { 
            price: thePlan?.stripePriceId,

            metadata: {
              subscriptionPlanId: thePlan?.id || 'no_sub_id',
              // todo get subscriptionItem Id. prob have to use afterOperation
              // subscriptionPlanItemId: thePlan?.id|| 'no_item_id',
              subscriptionPlanName: thePlan?.name || 'no_sub_name',
            }, 
          },
        ],
        metadata: {
          subscriptionPlanId: thePlan?.id|| 'no_sub_id',
          subscriptionPlanName: thePlan?.name || 'no_sub_name',
        }
      })
      console.log({resStripe})
      console.log(' --------- NEW SUBSCRIPTION MADE')


      const now = new Date
      const order = await context.db.SubscriptionItem.createOne({
        data: {
          // @ts-ignore
          custom_price: resStripe.plan.amount,
          subscriptionPlan: { connect: { id: planId } },
          user: { connect: { id: user.id } },
          // @ts-ignore
          stripeId: resStripe.id,
          // stripeItemId: resStripe.id,

          dateCreated: now.toISOString(),
          dateModified: now.toISOString(),
        },
      }).catch((error:any) => {
        console.log('+++++++ catch checkout error');
        console.log('!!! MUTATION checkoutSubscription ERROR', error);
      })
      // todo do i need this now that i'm using "stockMax" instead of "stockCount"?
      // type SubPlan = {
      //   stockCount:number,
      //   status?:string
      // }

      // const newData:SubPlan = {
      //   stockCount: thePlan.stockCount - 1
      // }

      // // todo if thePlan.stockCount - 1 <= 0
      // // set thePlan.status = OUT_OF_STOCK

      // if(newData.stockCount <= 0) newData.status = 'OUT_OFF_STOCK'

      const updatedSubPlan = await context.db.SubscriptionPlan.updateOne({
        where: { id: thePlan.id },
        data: newPlanData,
      })

      return order
      // return null
      
    } catch (error:any) {
      // console.log({error});
      // console.log('checkout subscription Error: ', error);

      // if(error.code === 'resource_missing') return error

      throw error
    }
  
  }
})
