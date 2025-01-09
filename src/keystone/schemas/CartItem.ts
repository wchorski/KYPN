import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, } from "@keystone-6/core/fields";


export const CartItem:Lists.CartItem = list({

  // TODO allow non users to order items?
  access: allowAll,

  

  fields: {
    quantity: integer({
      defaultValue: 1,
      validation: { isRequired: true }
    }),
    type: select({
      options: [
        { label: 'Sale', value: 'SALE' },
        { label: 'Rental', value: 'RENTAL' },
      ],
      validation: { isRequired: true },
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' }),
  }
})
