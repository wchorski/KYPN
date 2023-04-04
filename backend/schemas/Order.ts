import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text, timestamp, virtual } from "@keystone-6/core/fields";
import moneyFormatter from "../lib/moneyFormatter";


export const Order = list({
  access: allowAll,
  // access: {
  //   filter: {
  //       query: async ({ session, context, listKey, operation }) => {
  //           if (isSignedIn(session)) return false
  //           if (permissions.canManageOrders(session)) return true
  //           return { user: { id: { equals: session.itemId } } };
  //       },
  //       update: ({ session, context, listKey, operation }) => {
  //           if (!isSignedIn(session)) return false
  //           if (permissions.canManageOrders) return true
  //           return { user: { id: { equals: session.itemId } } };
  //       },
  //       delete: async ({ session, context, listKey, operation }) => {
  //           if (!isSignedIn(session)) return false
  //           if (permissions.canManageOrders) return true
  //           return { user: { id: { equals: session.itemId } } };
  //       },
  //   },
  //   operation: {
  //       query: ({ session, context, listKey, operation }) => true,
  //       create: ({ session, context, listKey, operation }) => true,
  //       update: ({ session, context, listKey, operation }) => true,
  //       delete: ({ session, context, listKey, operation }) => true,
  //   },
  // },
  ui:{
    listView: {
      initialColumns: ['label', 'createdAt', 'user', 'createdAt']
    }
  },
  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item:any) {
          return `${moneyFormatter(item.total)}`;
        },
      })
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true}),
    user: relationship({ ref: 'User.orders'}),
    charge: text(),
    createdAt: timestamp(),
  },
})
