import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text } from "@keystone-6/core/fields";

// import 'dotenv/config';
// import { relationship, text } from '@keystone-next/fields';
// import { list } from '@keystone-next/keystone/schema';
// import { cloudinaryImage } from '@keystone-next/cloudinary';
// import { isSignedIn, permissions } from '../access';

// export const cloudinary = {
//   cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//   apiKey: process.env.CLOUDINARY_KEY,
//   apiSecret: process.env.CLOUDINARY_SECRET,
//   folder: 'sickfits',
// };

// export const ProductImage = list({
//   access: {
//     create: isSignedIn,
//     read: () => true,
//     update: permissions.canManageProducts,
//     delete: permissions.canManageProducts,
//   },
//   fields: {
//     image: cloudinaryImage({
//       cloudinary,
//       label: 'Source',
//     }),
//     altText: text(),
//     product: relationship({ ref: 'Product.photo' }),
//   },
//   ui: {
//     listView: {
//       initialColumns: ['image', 'altText', 'product'],
//     },
//   },
// });


export const ProductImage = list({
  access: allowAll,
  fields: {
    image: image({ storage: 'my_local_images'}), 
    altText: text({validation: { isRequired: true }, defaultValue: 'Product Featured Image'}),
    filename: text({ isIndexed: 'unique' }),
    product: relationship({ref: 'Product.photo'}),
  },
  ui:{
    listView: {
      initialColumns: ['image', 'altText', 'product']
    }
  }
})