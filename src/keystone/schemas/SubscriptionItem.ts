import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { checkbox, image, integer, relationship, select, text, timestamp,  } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import { validate } from "graphql";
import stripeConfig, { stripeSubscriptionCreate, stripeSubscriptionUpdate } from "../../lib/stripe";
import 'dotenv/config'
import { SubscriptionPlan, SubscriptionItem as TypeSubsItem, User } from "../types";
import { mailSubscription } from "../../lib/mail";
import { envs } from "../../../envs";
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
    notes: text({
      ui: {
        displayMode: 'textarea'
      }
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
        //? checkout is handles w /app/api/checkout/subscriptionplan & /app/keystone/mutations/checkoutSubscripiton
      // }
      

      if (operation === 'update') {

        const now = new Date()
        resolvedData.dateModified = now

        if(item.status === 'CANCELED') {
          console.log('!!!!!!!! sub item is canceled and cannot be re-activated');
          throw new Error('!!!!!!!! sub item is canceled and cannot be re-activated')
        }
      
        if(resolvedData.status) stripeSubscriptionUpdate({
          subItemId: item.id, 
          stripeSubscriptionId: item.stripeSubscriptionId, 
          status: resolvedData.status as TypeSubsItem['status']
        })
          
      }
    },
    afterOperation: async ({ operation, resolvedData, item, context }) => {

      if(operation === 'create' || operation === 'update'){

        const customer = await context.sudo().query.User.findOne({
          where: {id: item?.userId},
          query: `
            email
          `
        }) as User

        const subscriptionItem = await context.sudo().query.SubscriptionItem.findOne({
          where: {id: item?.id},
          query: `
            id
            status
            billing_interval
            dateCreated
            custom_price
            user {
              name
              email
            }
            subscriptionPlan {
              name
            }
          `
        }) as TypeSubsItem

        if(!subscriptionItem) return console.log('!!! no sub item found');
        

        const mail = await mailSubscription({
          to: [envs.ADMIN_EMAIL_ADDRESS, customer?.email],
          operation,
          subscriptionItem,
        })
      }
    },
  },
})
