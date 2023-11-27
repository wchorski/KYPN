import { list } from "@keystone-6/core";
// @ts-ignore
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
    // photo: relationship({
    //   ref: 'ProductImage',
    //   ui: {
    //     displayMode: 'cards',
    //     cardFields: ['image', 'altText'],
    //     inlineCreate: { fields: ['image', 'altText'] },
    //     inlineEdit: { fields: ['image', 'altText'] }
    //   }
    // }),
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

        try {
          // console.log({resolvedData});
          // console.log(resolvedData.product?.connect?.id);
  
          const currProduct = await context.db.Product.findOne({
            where: {id: resolvedData.product?.connect?.id}
          })
          
          // @ts-ignore
          const currData:Product = {
            // @ts-ignore
            stockCount: currProduct.stockCount - resolvedData.quantity,
          }
  
          if(currData.stockCount <= 0) currData.status = 'OUT_OF_STOCK'
  
          const updatedProduct = await context.db.Product.updateOne({
            where: {id: resolvedData.product?.connect?.id},
            // @ts-ignore
            data: currData
          })
          // console.log({updatedProduct});
          
        } catch (error: any) {
          console.log('!!! Order Item Create Error: ', error);
          throw new Error('Order Item Create Error: ' + error.message);
          
        }
        
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
