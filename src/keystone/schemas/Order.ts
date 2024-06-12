import { graphql, list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text, timestamp, virtual } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import moneyFormatter from "../../lib/moneyFormatter";
import { envs } from "../../../envs";
import { mailOrder } from "../../lib/mail";
import { User, Order as OrderType } from "../../keystone/types";


export const Order:Lists.Order = list({
  // access: allowAll,
  access: {
    filter: {
      query: rules.canOrder,
      update: rules.canManageOrders,
      delete: () => false,
    },
    operation: {
      query: permissions.isLoggedIn,
      // query: () => false,
      create: permissions.isLoggedIn,
      update: permissions.canManageOrders,
      delete: () => false,
    },
  },

  ui: {
    listView: {
      initialColumns: ['label', 'dateCreated', 'user', 'status', 'payment_status' ]
    }
  },

  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item: any) {
          return `${moneyFormatter(item.total)}`;
        },
      })
    }),
    email: text(),
    notes: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    rental: relationship({ ref: 'Rental.order', many: false }),
    ticketItems: relationship({ ref: 'Ticket.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text({validation: { isRequired: false }}),
    stripeSessionId: text(),
    status: select({
      options: [
        { label: 'started', value: 'STARTED' },
        { label: 'payment pending', value: 'PAYMENT_PENDING' },
        { label: 'payment recieved', value: 'PAYMENT_RECIEVED' },
        { label: 'processing', value: 'PROCESSING' },
        { label: 'shipped', value: 'SHIPPED' },
        { label: 'delivered', value: 'DELIVERED' },
        { label: 'cancelled', value: 'CANCELLED' },
        { label: 'fulfilled', value: 'FULFILLED' },
        { label: 'expired', value: 'EXPIRED' },
        { label: 'refunded', value: 'REFUNDED' },
        { label: 'returned', value: 'RETURNED' },
      ],
      defaultValue: 'STARTED',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    // todo move this all under 'status'
    // payment_status: select({
    //   options: [
    //     { label: 'paid', value: 'PAID' },
    //     { label: 'no_payment_required', value: 'NO_PAYMENT_REQUIRED' },
    //     { label: 'unpaid', value: 'UNPAID' },
    //   ],
    //   defaultValue: 'PAID',
    //   ui: {
    //     displayMode: 'segmented-control',
    //     createView: { fieldMode: 'edit' }
    //   }
    // }),
    shipping_address: text(),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
  },

  hooks: {
    afterOperation: async ({ operation, resolvedData, item, context }) => {

      if(operation === 'create' || operation === 'update'){

        const order = await context.sudo().query.Order.findOne({
          where: { id: item.id },
          query: `
            id
            dateCreated
            status
            total
            user {
              name
              email
            }
            items {
              image
              name
              quantity
              price
            }
            ticketItems {
              id
              orderCount
              event {
                summary
                image
                price
              }
            }
          `
        }) as OrderType        
        

        const customer = await context.sudo().query.User.findOne({
          where: { id: item.userId },
          query: `
            email
          `
        }) as User

        const mail = await mailOrder({
          to: [envs.ADMIN_EMAIL_ADDRESS, customer?.email || ''],
          operation,
          order,
        })
      }
    }
  }
})
