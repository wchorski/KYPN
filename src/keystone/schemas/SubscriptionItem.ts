import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { checkbox, image, integer, relationship, select, text, timestamp,  } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import { validate } from "graphql";
import stripeConfig from "../../lib/stripe";
import 'dotenv/config'
import { SubscriptionItem as TypeSubsItem } from "../types";
// import { SubscriptionItem, SubscriptionItem } from "../types";


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
      update: permissions.isLoggedIn,
      delete: permissions.isLoggedIn,
    }
  },

  ui: {
    listView: {
      initialColumns: ['user', 'subscriptionPlan', 'status', 'custom_price', 'billing_interval', 'dateModified'],
      initialSort: {
        field: 'dateModified', direction: 'DESC'
      }
    }
  },

  fields: {

    custom_price: integer(),

    subscriptionPlan: relationship({
      ref: 'SubscriptionPlan.items',
      many: false,
      // todo this validation seems nice but messes up updating
      // hooks: {
      //   validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
      //     const connection = resolvedData[fieldKey];
      //     if (!connection) return addValidationError(`Must choose a Subscription Plan`);
      //   },
      // },
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
        { label: 'Paused',      value: 'PAUSED' },
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
      },
      validation: { isRequired: true},
    }),
    addons: relationship({ ref: 'Addon.subscriptionItems', many: true }),
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
      // hooks: {
      //   validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
      //     const connection = resolvedData[fieldKey];
      //     if (!connection) return addValidationError(`Must choose a User`);
      //   },
      // }
    }),
    stripeChargeId: text(),
    stripeSubscriptionId: text(),
    coupons: relationship({
      ref: 'Coupon.subscriptionItems',
      many: true,
    }),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
  },

  hooks: {

    beforeOperation: async ({ operation, resolvedData, context, item }) => {

      // if (operation === 'create') {
        
      // }

      if (operation === 'update') {

        // todo if thePlan.stockCount > 0
        // set thePlan.status = ACTIVE

        const now = new Date()
        resolvedData.dateModified = now

        if(item.status === 'CANCELED') {
          console.log('!!!!!!!! sub item is canceled and cannot be re-activated');
          throw new Error('!!!!!!!! sub item is canceled and cannot be re-activated')
        }
        
        // TODO handle stripe payment if user pauses, is delinquent, or cancels subscriptionItem

        if(resolvedData.status) handleStatusChange( item.id, item.stripeSubscriptionId, resolvedData.status as TypeSubsItem['status'])
          
      }
    },
    // afterOperation: async ({ operation, resolvedData, item, context }: { operation: any, resolvedData: any, item: any, context: any }) => {


    // },
  },
})



async function handleStatusChange(subItemId:string, stripeSubscriptionId:string, status:TypeSubsItem['status'],){
  
  // console.log(' **** status update *****'); 
  // console.log(status);

  // const thePlan = await context.db.SubscriptionPlan.findOne({
  //   where: { id: item.subscriptionPlanId },
  //   query: `
  //     stockMax
  //   `,
  // })

  try {

    switch (status) {
      case 'PAUSED':
        const resPause = await stripeConfig.subscriptions.update(
          stripeSubscriptionId,
          {
            pause_collection: {
              behavior: 'void'
            },
            metadata: {
              subscriptionItemId: subItemId
            }
          }
        )
        break;

      case 'ACTIVE':
        const resActive = await stripeConfig.subscriptions.update(
          stripeSubscriptionId,
          {
            pause_collection: '',
          }
        )
        break;
      
      case 'CANCELED':
        const resCancle = await stripeConfig.subscriptions.cancel(stripeSubscriptionId);
    
      default:
        console.log('### SubscriptionItem Schema. status not supported')
        break;
    }
    
    
  } catch (error) {
    console.log("sub item update error: ", error);
    // @ts-ignore
    throw new Error("Sub Item Status Change Error: ", error.message);
    
  }
}
