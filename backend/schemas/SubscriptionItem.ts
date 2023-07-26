import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { checkbox, image, integer, relationship, select, text, timestamp,  } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import { validate } from "graphql";
import stripeConfig from "../lib/stripe";
import 'dotenv/config'


export const SubscriptionItem:Lists.SubscriptionItem = list({
  // access: allowAll,
  access: {
    filter: {
      // todo throwing strange error in keystone main dash
      // query: rules.canManageOrderItems,
      query: () => true,
      update: rules.canManageSubscriptionItems
    },
    operation: {
      create: permissions.isLoggedIn,
      query: () => true,
      update: permissions.canManageSubscriptionItems,
      delete: permissions.canManageSubscriptionItems,
    }
  },

  ui: {
    listView: {
      initialColumns: ['user', 'subscriptionPlan', 'isActive', 'isDelinquent', 'custom_price']
    }
  },

  fields: {

    custom_price: integer(),

    subscriptionPlan: relationship({
      ref: 'SubscriptionPlan.items',
      many: false,
      hooks: {
        validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
          const connection = resolvedData[fieldKey];
          if (!connection) return addValidationError(`Must choose a Subscription Plan`);
        },
      },
    }),
    isActive: checkbox({ defaultValue: true }),
    isDelinquent: checkbox({ defaultValue: false }),
    status: select({
      options: [
        { label: 'Active',      value: 'ACTIVE' },
        { label: 'Trial',       value: 'TRIAL' },
        { label: 'Expired',     value: 'EXPIRED' },
        { label: 'Canceled',    value: 'CANCELED' },
        { label: 'Suspended',   value: 'SUSPENDED' },
        { label: 'Delinquent',  value: 'DELINQUENT' },
      ],
      defaultValue: 'ACTIVE',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    billing_interval: select({
      options: [
        { label: 'Daily', value: 'day' },
        { label: 'Weekly', value: 'week' },
        { label: 'Monthly', value: 'month' },
        { label: 'Yearly', value: 'year' },
      ],
      defaultValue: 'month',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    user: relationship({
      ref: 'User.subscriptions',
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineConnect: true,
      },

      many: false,
      hooks: {
        validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
          const connection = resolvedData[fieldKey];
          if (!connection) return addValidationError(`Must choose a User`);
        },
      }
    }),
    stripeId: text(),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
  },

  hooks: {

    beforeOperation: async ({ operation, resolvedData, context, item }) => {
      try {
        if (resolvedData && !resolvedData.user) {
          const currentUserId = await context.session.itemId;
          // console.log({ currentUserId });
          resolvedData.user = { connect: { id: currentUserId } };
        }
      } catch (err) { console.warn(err) }

      if (operation === 'create') {
        // todo moving this to checkoutSubscription
        // // console.log(resolvedData.subscriptionPlan.connect)

        // const currUser = await context.db.User.findOne({ where: { id: resolvedData.user?.connect?.id } })
        // const currSub = await context.db.SubscriptionPlan.findOne({ where: { id: resolvedData.subscriptionPlan?.connect?.id } })
        // // console.log({ currSub });

        // if (!resolvedData.custom_price) {
        //   // todo add this for sale or other stuff
        // }
        // console.log('==== NEW SUBSCR ITEM');     
        
        // try {
        //   const resStripe = await stripeConfig.subscriptions.create({
   
        //     customer: currUser?.stripeCustomerId || 'no_stripe_user_id',
        //     description: currSub?.name + ' | ' + currSub?.id,
        //     items: [
        //       { 
        //         price: currSub?.stripePriceId,
      
        //         metadata: {
        //           subscriptionPlanId: currSub?.id || 'no_sub_id',
        //           // todo get subscriptionItem Id. prob have to use afterOperation
        //           subscriptionPlanItemId: currSub?.id|| 'no_item_id',
        //           subscriptionPlanName: currSub?.name || 'no_sub_name',
        //         } 
        //       },
        //     ],
        //     metadata: {
        //       subscriptionPlanId: currSub?.id|| 'no_sub_id',
        //       subscriptionPlanName: currSub?.name || 'no_sub_name',
        //     }
        //   })
          
        //   console.log('======= STRIPE RES');
          
        //   console.log(resStripe);
          
        // } catch (err:any) {
        //   // console.log('uh oh, ', error);

        //   switch (err.type) {
        //     case 'StripeCardError':
        //       console.log(`A payment error occurred: ${err.message}`);
        //       break;
        //     case 'StripeInvalidRequestError':
        //       console.log('An invalid request occurred.');
        //       break;
        //     default:
        //       console.log('Another problem occurred, maybe unrelated to Stripe.');
        //       break;
        //   }

        //   throw new Error(`TYPE: ${err.type}, MESSAGE: ${err.message}`);
          
        // }

        
      }

      if (operation === 'update') {

      }
    },
    // afterOperation: async ({ operation, resolvedData, item, context }: { operation: any, resolvedData: any, item: any, context: any }) => {


    // },
  },
})
