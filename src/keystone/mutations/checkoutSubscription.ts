// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from '@keystone-6/core';
// @ts-ignore
import { Context } from '.keystone/types';
// import { relationship } from '@keystone-6/core/fields';
import stripeConfig from '../../lib/stripe';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { CartItem, SubscriptionItem } from '../types';

const IMG_PLACEHOLD = process.env.FRONTEND_URL + '/assets/product-placeholder.png'

type SubPlan = {
  status?:'DRAFT'|'AVAILABLE'|'OUT_OF_STOCK'
}

export const checkoutSubscription = (base: BaseSchemaMeta) => graphql.field({
  type: base.object('SubscriptionItem'),

  args: { 
    custom_price: graphql.arg({ type: graphql.nonNull(graphql.Int) }),
    amount_total: graphql.arg({ type: graphql.nonNull(graphql.Int) }),
    planId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    chargeId: graphql.arg({ type: graphql.nonNull(graphql.String) }), 
    stripeSubscriptionId: graphql.arg({ type: graphql.nonNull(graphql.String) }), 
    customerEmail: graphql.arg({ type: graphql.nonNull(graphql.String) }), 
  },

  async resolve(source, { planId, chargeId, amount_total, custom_price, customerEmail, stripeSubscriptionId }, context: Context) {
    const contextSudo = context.sudo()

    try {

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
      const user = await contextSudo.query.User.findOne({
        where: { email: customerEmail },
        query:
          `
            id
            name
            email
            stripeCustomerId
          `,
      })
      if(!user) throw new Error('This user is not registered to the website')

      const now = new Date
      const subscriptionItem = await contextSudo.db.SubscriptionItem.createOne({
        data: {
          custom_price: amount_total,
          subscriptionPlan: { connect: { id: planId } },
          user: { connect: { id: user.id } },
          stripeChargeId: chargeId,
          stripeSubscriptionId: stripeSubscriptionId,
          status: "ACTIVE",
          dateCreated: now.toISOString(),
          dateModified: now.toISOString(),
        },
      }).catch((error:any) => {
        console.log('+++++++ catch checkout error');
        console.log('!!! MUTATION checkoutSubscription ERROR', error);
      }) as SubscriptionItem|undefined

      const updatedSubPlan = await context.db.SubscriptionPlan.updateOne({
        where: { id: thePlan.id },
        data: newPlanData,
      })

      return {
        subscriptionItem,
        status: 'success',
        message: 'subscription started',
        id: subscriptionItem?.id,
      }
      // return null
      
    } catch (error:any) {
      // console.log({error});
      console.log('MUTATION checkoutsubscription Error: ', error);

      // if(error.code === 'resource_missing') return error

      return {
        error
      } 
    }
  
  }
})
