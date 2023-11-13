import { graphql, list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text, timestamp, virtual } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import moneyFormatter from "../../lib/moneyFormatter";


export const Order:Lists.Order = list({
  // access: allowAll,
  access: {
    filter: {
      query: rules.canOrder,
      update: () => false,
      delete: () => false,
    },
    operation: {
      query: permissions.isLoggedIn,
      // query: () => false,
      create: permissions.isLoggedIn,
      update: () => false,
      delete: () => false,
    },
  },

  ui: {
    listView: {
      initialColumns: ['label', 'dateCreated', 'user', ]
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
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    ticketItems: relationship({ ref: 'Ticket.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
    stripeSessionId: text(),
    status: select({
      options: [
        { label: 'open', value: 'OPEN' },
        { label: 'complete', value: 'COMPLETE' },
        { label: 'expired', value: 'EXPIRED' },
      ],
      defaultValue: 'COMPLETE',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    payment_status: select({
      options: [
        { label: 'paid', value: 'PAID' },
        { label: 'no_payment_required', value: 'NO_PAYMENT_REQUIRED' },
        { label: 'unpaid', value: 'UNPAID' },
      ],
      defaultValue: 'PAID',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    shipping_address: text(),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
  },
})
