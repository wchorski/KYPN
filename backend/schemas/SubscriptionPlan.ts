import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text } from "@keystone-6/core/fields";
import { isLoggedIn, permissions, rules } from "../access";
import stripeConfig from "../lib/stripe";
import 'dotenv/config'

const SITE_TITLE = process.env.SITE_TITLE || 'Ecommerce '

export const SubscriptionPlan = list({
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


  fields: {
    photo: relationship({
      ref: 'ProductImage.subscription',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText', 'filename'],
        inlineCreate: { fields: ['image', 'altText', 'filename'] },
        inlineEdit: { fields: ['image', 'altText', 'filename'] }
      }
    }),

    name: text({ validation: { isRequired: true } }),
    slug: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      hooks: {
        validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
          const inputValue = resolvedData[fieldKey];

          if (!inputValue) return
          if (!inputValue.match(/^[a-z0-9]+(?:-[A-Za-z0-9]+)*$/)) {
            addValidationError(`Can only contain lower case "a-z" and dash "-" characters.`);
          }
        },
      }
    }),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),

    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Out of Stock', value: 'OUT_OFF_STOCK' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),

    price: integer(),
    stripeProductId: text({ defaultValue: 'NO_PROD_ID' }),
    stripePriceId: text({ defaultValue: 'NO_PRICE_ID' }),
    billing_interval: select({
      options: [
        { label: 'Daily', value: 'day' },
        { label: 'Weekly', value: 'week' },
        { label: 'Monthly', value: 'month' },
        { label: 'Yearly', value: 'year' },
      ],
      defaultValue: 'month',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),


    stockCount: integer({ validation: { isRequired: true }, defaultValue: 0 }),
    users: relationship({
      ref: 'User.subscriptions',
      many: true,
    }),

    tags: relationship({
      ref: 'Tag.subscriptions',
      many: true,
    }),
    categories: relationship({
      ref: 'Category.subscriptions',
      many: true,
    }),
  },
  hooks: {
    // TODO use this to create a default 'slug' automatically based on product name
    // if no user set, connect to current session user
    beforeOperation: async ({ operation, resolvedData, context, item }) => {
      try {
        if (resolvedData && !resolvedData.user) {
          const currentUserId = await context.session.itemId;
          // console.log({ currentUserId });
          resolvedData.user = { connect: { id: currentUserId } };
        }
      } catch (err) { console.warn(err) }

      if (operation === 'create') {

        const price = await stripeConfig.prices.create({
          unit_amount: resolvedData.price,
          currency: 'usd',
          recurring: { interval: resolvedData.billing_interval },
          product_data: {
            name: resolvedData.name,
            active: true,
            statement_descriptor: SITE_TITLE + ' Subscription',
            metadata: {
              status: resolvedData.status,
              description: resolvedData.description,
            }
          },
        }).then(price => {
          console.log('price is then, ')
          console.log({ price });

        }).catch(err => console.warn(err))


        // const res = await stripeConfig.products.create({
        //   // id: resolvedData.id, // todo idk if it gets an id 'beforeoperaiton'
        //   name: resolvedData.name,
        //   active: true,
        //   description: resolvedData.description,
        //   metadata: {
        //     category: resolvedData.categories ? resolvedData.categories[0] : 'uncategorized',
        //     status: resolvedData.status,
        //     author: resolvedData.user.email,
        //   },
        //   // images: [
        //   //   resolvedData.photo.image.publicUrlTransformed
        //   // ],
        //   attributes: [
        //     'Size',
        //     'Color'
        //   ],
        //   shippable: false,
        //   // package_dimensions: {
        //   //   height: 10,
        //   //   length: 20,
        //   //   width: 30,
        //   //   weight: 5
        //   // },
        //   unit_label: 'units',
        //   default_price_data: {
        //     currency: 'usd',
        //     unit_amount: resolvedData.price,
        //   },
        //   url: process.env.FRONTEND_URL + '/shop/product/' + resolvedData.id

        // })
        //   .then(async (res) => {

        //     if (resolvedData && !resolvedData.product) {
        //       resolvedData.stripeProductId = res.id
        //       resolvedData.stripePriceId = res.default_price
        //     }
        //   })
        //   .catch(err => { console.warn(err) })
      }

      if (operation === 'update') {

        //   const photo = await context.db.ProductImage.findOne({
        //     where: {
        //       id: resolvedData.photoId ? resolvedData.photoId : item.photoId
        //     }
        //   })

        //   const currPrice = await stripeConfig.prices.retrieve(
        //     resolvedData.stripePriceId ? resolvedData.stripePriceId : item.stripePriceId
        //   )


        //   // todo this is ugly, but Stripe API does not support deletion or updating of a price object
        //   if (currPrice.unit_amount !== item.price) {

        //     const newPrice = await stripeConfig.prices.create({
        //       unit_amount: resolvedData.price,
        //       currency: 'usd',
        //       product: resolvedData.stripeProductId ? resolvedData.stripeProductId : item.stripeProductId,
        //     })

        //     resolvedData.stripePriceId = newPrice.id

        //     const product = await stripeConfig.products.update(
        //       resolvedData.stripeProductId ? resolvedData.stripeProductId : item.stripeProductId,
        //       {
        //         name: resolvedData.name ? resolvedData.name : item.name,
        //         description: resolvedData.description ? resolvedData.description : item.description,
        //         default_price: newPrice.id,
        //         images: [
        //           // @ts-ignore
        //           photo.image._meta.secure_url
        //         ],
        //         metadata: {
        //           category: resolvedData.categories ? resolvedData.categories[0] : 'uncategorized',
        //           status: resolvedData.status,
        //           author: resolvedData.user.email,
        //         }
        //       }
        //     )
        //   } else if (currPrice.unit_amount === item.price) {

        //     const product = await stripeConfig.products.update(
        //       resolvedData.stripeProductId ? resolvedData.stripeProductId : item.stripeProductId,
        //       {
        //         name: resolvedData.name ? resolvedData.name : item.name,
        //         description: resolvedData.description ? resolvedData.description : item.description,
        //         images: [
        //           // @ts-ignore
        //           photo.image._meta.secure_url
        //         ],
        //         metadata: {
        //           category: resolvedData.categories ? resolvedData.categories[0] : 'uncategorized',
        //           status: resolvedData.status,
        //           author: resolvedData.user.email,
        //         }
        //       }
        //     )
        //   }

      }

    },
    afterOperation: async ({ operation, resolvedData, item, context }: { operation: any, resolvedData: any, item: any, context: any }) => {

      //   if (operation === 'create') {
      //     try {
      //       const photo = await context.db.ProductImage.findOne({
      //         where: {
      //           id: item.photoId
      //         }
      //       })

      //       const product = await stripeConfig.products.update(
      //         item.stripeProductId,
      //         {
      //           images: [
      //             photo.image._meta.secure_url
      //           ],
      //         }
      //       )
      //     } catch (err) { console.warn(err) }

      //   }

      //   // if (operation === 'update') {
      //   //   try {


      //   //   } catch (err) { console.warn(err) }
      //   // }

      //   if (operation === 'delete') {
      //     const deleted = await stripeConfig.products.del(
      //       item.stripeProductId,
      //     );
      //   }

    },
  },
})
