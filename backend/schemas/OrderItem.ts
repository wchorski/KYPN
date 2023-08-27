import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import { Product } from "../types";


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
    image: text(),
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
    product: relationship({ref: 'Product.orderItems', many: false}),
    // todo add this link for receipt convienince?
    // product: relationship({ ref: 'Product.items' }),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
  },

  hooks:{
    beforeOperation: async ({ operation, resolvedData, context, item }) => {
      if(operation === 'create'){
        // TODO figure out how to remove stock
        console.log({resolvedData});
        console.log(resolvedData.product.connect.id);
        
        // @ts-ignore
        // const currData:Product = {
        //   stockCount: item.product.stockCount - item.quantity,
        // }

        // if(currData.stockCount <= 0) currData.status = 'OUT_OF_STOCK'

        // const product = await context.db.Product.updateOne({
        //   where: {id: item.product.id},
        //   // @ts-ignore
        //   data: currData
        // })
      }
    }
  }
})


// const currData:Product = {
//   stockCount: item.product.stockCount - item.quantity,
// }

// if(currData.stockCount <= 0) currData.status = 'OUT_OF_STOCK'

// const product = await context.db.Product.updateOne({
//   where: {id: item.product.id},
//   // @ts-ignore
//   data: currData
// })

// return product
