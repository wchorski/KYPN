import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, image, integer, relationship, select, text } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import { validate } from "graphql";
import stripeConfig from "../lib/stripe";
import 'dotenv/config'


export const SubscriptionItem = list({
  // access: allowAll,
  access: {
    filter: {
      // todo throwing strange error in keystone main dash
      // query: rules.canManageOrderItems,
      query: () => true,
    },
    operation: {
      create: permissions.isLoggedIn,
      query: () => true,
      update: () => false,
      delete: () => false,
    }
  },

  ui: {
    listView: {
      initialColumns: ['user', 'subscriptionPlan', 'isActive', 'isDelinquent']
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
        // console.log(resolvedData.subscriptionPlan.connect)

        const currUser = await context.db.User.findOne({ where: { id: resolvedData.user.connect.id } })
        const currSub = await context.db.SubscriptionPlan.findOne({ where: { id: resolvedData.subscriptionPlan.connect.id } })
        // console.log({ currSub });

        if (!resolvedData.custom_price) {
          // todo add this for sale or other stuff
        }

        const subscription = await stripeConfig.subscriptions.create({
          // @ts-ignore
          customer: currUser.stripeCustomerId,
          items: [
            // @ts-ignore
            { price: currSub?.stripePriceId, },
          ],
        })
      }

      if (operation === 'update') {

      }
    },
    // afterOperation: async ({ operation, resolvedData, item, context }: { operation: any, resolvedData: any, item: any, context: any }) => {


    // },
  },
})
