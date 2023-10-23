import { list } from "@keystone-6/core";
// @ts-ignore
import { Lists } from '.keystone/types';

import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { isLoggedIn, permissions, rules } from "../access";
import stripeConfig from "../../lib/stripe";
import { document } from '@keystone-6/fields-document';
import { componentBlocks } from "../blocks";

const FRONTEND_URL = process.env.FRONTEND_URL

export const Product:Lists.Product = list({
  // access: allowAll,
  access: {
    filter: {
      // query: rules.canReadProducts,
      query: () => true,
      delete: rules.canManageProducts,
      update: rules.canManageProducts,
    },
    operation: {
      query: () => true,
      create: isLoggedIn,
      update: isLoggedIn,
      delete: isLoggedIn,
    }
  },

  ui: {

    listView: {
      initialColumns: ['name', 'price', 'stockCount', 'status', 'dateModified', 'author', 'categories' ],
      initialSort: { field: 'start', direction: 'DESC'}
    },
  },


  fields: {
    // photo: relationship({
    //   ref: 'ProductImage.product',
    //   ui: {
    //     displayMode: 'cards',
    //     cardFields: ['image', 'altText', 'filename'],
    //     inlineCreate: { fields: ['image', 'altText', 'filename'] },
    //     inlineEdit: { fields: ['image', 'altText', 'filename'] }
    //   }
    // }),
    image: text({defaultValue: FRONTEND_URL + '/assets/private/placeholder.png'}),
    name: text({ validation: { isRequired: true } }),
    stripeProductId: text({ defaultValue: 'NO_PROD_ID' }),
    stripePriceId: text({ defaultValue: 'NO_PRICE_ID' }),
    slug: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      hooks: {
        validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
          const inputValue = resolvedData[fieldKey];

          if (!inputValue) return
          // @ts-ignore //todo might cause problems
          if (!inputValue.match(/^[a-z0-9]+(?:-[A-Za-z0-9]+)*$/)) {
            addValidationError(`Can only contain lower case "a-z" and dash "-" characters.`);
          }
        },
      }
    }),
    excerpt: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    description: document({
      componentBlocks,
      ui: {
        views: './src/keystone/blocks',
      },
      formatting: {
        inlineMarks: {
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
          code: true,
          superscript: true,
          subscript: true,
          keyboard: true,
        },
        listTypes: {
          ordered: true,
          unordered: true,
        },
        alignment: {
          center: true,
          end: true,
        },
        headingLevels: [2, 3, 4, 5, 6],
        blockTypes: {
          blockquote: true,
          code: true
        },
        softBreaks: true,
      },
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Out of Stock', value: 'OUT_OF_STOCK' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),

    price: integer(),

    stockCount: integer({ validation: { isRequired: true }, defaultValue: 0 }),
    // todo make this 'author' instead for clarity
    author: relationship({
      ref: 'User.products',
    }),
    orderItems: relationship({ref: 'OrderItem.product', many: true}),
    tags: relationship({
      // we could have used 'Tag', but then the relationship would only be 1-way
      ref: 'Tag.products',

      // a Post can have many Tags, not just one
      many: true,

      // this is some customisations for changing how this will look in the AdminUI
      // ui: {
      //   displayMode: 'cards',
      //   cardFields: ['name'],
      //   inlineEdit: { fields: ['name'] },
      //   linkToItem: true,
      //   inlineConnect: true,
      //   inlineCreate: { fields: ['name'] },
      // },
    }),
    categories: relationship({
      ref: 'Category.products',
      many: true,
    }),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
    
  },
  hooks: {
    // TODO use this to create a default 'slug' automatically based on product name
    // if no user set, connect to current session user
    beforeOperation: async ({ operation, resolvedData, context, item }) => {
      try {
        if (resolvedData && !resolvedData.author) {
          // todo there is an error here
          // console.log(context.session);
          
          const currentUserId = await context.session.itemId;
          // console.log({ currentUserId });
          resolvedData.author = { connect: { id: currentUserId } };
        }
      } catch (err) { console.warn(err) }

      if (operation === 'create') {


        const res = await stripeConfig.products.create({
          // id: resolvedData.id, // todo idk if it gets an id 'beforeoperaiton'
          name: resolvedData.name || '',
          active: true,
          description: resolvedData.excerpt || 'no_description',
          images: [
            resolvedData.image || FRONTEND_URL + '/assets/private/placeholder.png',
          ],
          metadata: {
            // @ts-ignore //todo might cause problems
            category: resolvedData.categories ? resolvedData.categories[0].name : 'uncategorized',
            status: resolvedData.status || '',
            // @ts-ignore //todo might cause problems
            author: resolvedData.author?.email,
            type: 'single product'
          },
          // images: [
          //   resolvedData.photo.image.publicUrlTransformed
          // ],
          // @ts-ignore
          attributes: [
            'Size',
            'Color'
          ],
          shippable: false,
          // package_dimensions: {
          //   height: 10,
          //   length: 20,
          //   width: 30,
          //   weight: 5
          // },
          unit_label: 'units',
          default_price_data: {
            currency: 'usd',
            // @ts-ignore //todo might cause problems
            unit_amount: resolvedData.price,
          },
          url: process.env.FRONTEND_URL + '/shop/product/' + resolvedData.id

        })
          .then(async (res) => {
            // @ts-ignore //todo might cause problems
            if (resolvedData && !resolvedData.product) {
              resolvedData.stripeProductId = res.id
              // @ts-ignore //todo might cause problems
              resolvedData.stripePriceId = res.default_price
            }
          })
          .catch(err => { console.warn(err) })
      }

      if (operation === 'update') {

        // const photo = await context.db.ProductImage.findOne({
        //   where: {
        //     // @ts-ignore //todo might cause problems
        //     id: resolvedData.photoId ? resolvedData.photoId : item.photoId
        //   }
        // })

        const photo = resolvedData.image ? resolvedData.image : item.image

        const currPrice = await stripeConfig.prices.retrieve(
          // @ts-ignore //todo might cause problems
          resolvedData.stripePriceId ? resolvedData.stripePriceId : item.stripePriceId
        )


        // todo this is ugly, but Stripe API does not support deletion or updating of a price object
        if (resolvedData.price && currPrice.unit_amount !== resolvedData.price) {

          const newPrice = await stripeConfig.prices.create({
            // @ts-ignore //todo might cause problems
            unit_amount: resolvedData.price,
            currency: 'usd',
            // @ts-ignore //todo might cause problems
            product: resolvedData.stripeProductId ? resolvedData.stripeProductId : item.stripeProductId,
          })

          resolvedData.stripePriceId = newPrice.id

          const product = await stripeConfig.products.update(
            // @ts-ignore //todo might cause problems
            resolvedData.stripeProductId ? resolvedData.stripeProductId : item.stripeProductId,
            {
              name: resolvedData.name ? resolvedData.name : item.name,
              description: resolvedData.excerpt ? resolvedData.excerpt : item.excerpt,
              default_price: newPrice.id,
              images: [
                // @ts-ignore
                // photo.image._meta.secure_url
                photo
              ],
              metadata: {
                // @ts-ignore //todo might cause problems
                // category: resolvedData.categories ? resolvedData.categories[0] : 'uncategorized',
                // status: resolvedData.status,
                // author: resolvedData.author.email,
              }
            }
          )
        } else if (currPrice.unit_amount === item.price) {

          const product = await stripeConfig.products.update(
            // @ts-ignore //todo might cause problems
            resolvedData.stripeProductId ? resolvedData.stripeProductId : item.stripeProductId,
            {
              name: resolvedData.name ? resolvedData.name : item.name,
              description: resolvedData.excerpt ? resolvedData.excerpt : item.excerpt,
              images: [
                // @ts-ignore
                // photo.image._meta.secure_url
                photo
              ],
              metadata: {
                // @ts-ignore //todo might cause problems
                // category: resolvedData.categories ? resolvedData.categories[0].name : 'uncategorized',
                // status: resolvedData.status,
                // author: resolvedData.author?.email,
              }
            }
          )
        }
      }

    },
    afterOperation: async ({ operation, resolvedData, item, context }) => {

      if (operation === 'create') {
        try {
          // todo not using ProductImg anymore?
          // const photo = await context.db.ProductImage.findOne({
          //   where: {
          //     id: item?.photoId
          //   }
          // })

          const product = await stripeConfig.products.update(
            item?.stripeProductId as string,
            {
              images: [
                // @ts-ignore //todo might cause problems
                photo?.image?._meta.secure_url
              ],
            }
          )
        } catch (err) { console.warn(err) }

      }

      // if (operation === 'update') {
      //   try {


      //   } catch (err) { console.warn(err) }
      // }

      if (operation === 'delete') {
        if(!item) return
        const deleted = await stripeConfig.products.del(
          // @ts-ignore //todo might cause problems
          item.stripeProductId,
        );
      }

    },
  },
})
