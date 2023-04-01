import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text } from "@keystone-6/core/fields";


export const CartItem = list({
  access: allowAll,
  // TODO custom label
  ui:{
    listView: {
      initialColumns: ['product', 'quantity', 'user']
    }
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      validation: { isRequired: true }
    }),
    product: relationship({ref: 'Product'}),
    user: relationship({ref: 'User.cart'}),
    
  }
})
