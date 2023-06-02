import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text } from "@keystone-6/core/fields";
import { permissions } from "../access";
require('dotenv').config()

export const cloudinary = {
  // todo WHY NOT WORKING? "Invalid cloud_name cutefruit"
  cloudName: process.env.CLOUDINARY_NAME || 'NO_CLOUD_NAME',
  apiKey: process.env.CLOUDINARY_KEY || 'NO_CLOUD_KEY',
  apiSecret: process.env.CLOUDINARY_SECRET || 'NO_CLOUD_SECRET',
  folder: process.env.CLOUDINARY_API_FOLDER + '/product_images' || 'NO_CLOUD_FOLDER',
}


export const ProductImage:Lists.ProductImage = list({
  // access: allowAll,
  access: {
    // filter: {
    //   // query: rules.canManageUsers,
    //   // update: rules.canManageUsers,
    //   // delete: () => false,
    // },
    operation: {
      query: () => true,
      create: permissions.canManageProducts,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
    },
  },
  fields: {
    // ? below is for locally saved images
    // image: image({ storage: 'my_local_images' }),
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    // todo update this instead so there is a unified truth
    url: text(),
    altText: text({ validation: { isRequired: true }, defaultValue: 'Product Featured Image' }),
    filename: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    product: relationship({ ref: 'Product.photo' }),
    subscription: relationship({ ref: 'SubscriptionPlan.photo' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'product']
    }
  },
  hooks: {
    afterOperation: async ({ operation, resolvedData, item, context }: { operation: any, resolvedData: any, item: any, context: any }) => {

      // if (operation === 'create') {
      //   try {
      //     console.log({ item });

      //   } catch (err) { console.warn(err) }

      // }

      // if (operation === 'update') {
      //   console.log('&&&&&& prod image update ');

      //   // try {
      //   //   console.log({ item });

      //   // } catch (err) { console.warn(err) }

      // }
    }
  }
})