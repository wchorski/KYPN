import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, } from "@keystone-6/core/fields";


export const CartItem:Lists.CartItem = list({
  access: allowAll,

  // TODO custom label

  fields: {
    quantity: integer({
      defaultValue: 1,
      validation: { isRequired: true }
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' }),
  }
})
