import { graphql, list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text, timestamp, virtual } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import moneyFormatter from "../lib/moneyFormatter";


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
      initialColumns: ['label', 'createdAt', 'user', 'createdAt']
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
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
    createdAt: timestamp(),
  },
})
