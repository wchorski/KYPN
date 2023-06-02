import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";


export const OrderItem:Lists.OrderItem = list({
  // access: allowAll,
  access: {
    filter: {
      query: rules.canManageOrderItems,
    },
    operation: {
      create: permissions.isLoggedIn,
      query: () => true,
      update: () => false,
      delete: () => false,
    }
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    photo: relationship({
      ref: 'ProductImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] }
      }
    }),
    price: integer(),
    quantity: integer(),
    order: relationship({ ref: 'Order.items' }),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
  }
})
