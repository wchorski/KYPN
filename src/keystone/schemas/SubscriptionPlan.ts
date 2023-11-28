import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text, timestamp,  } from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';
import { isLoggedIn, permissions, rules } from "../access";
import stripeConfig from "../../lib/stripe";
import 'dotenv/config'
import { componentBlocks } from "../blocks";
import { slugFormat } from "../../lib/slugFormat";

const SITE_TITLE = process.env.SITE_TITLE || 'Ecommerce '
const IMG_PLACEHOLDER = process.env.FRONTEND_URL + '/assets/product-placeholder.png'

export const SubscriptionPlan:Lists.SubscriptionPlan = list({
  // access: allowAll,
  access: {
    filter: {
      // query: rules.canReadProducts,
      query: () => true,
      // delete: rules.canManageSubscriptionPlans,
      update: rules.canManageSubscriptionPlans,
    },
    operation: {
      query: () => true,
      create: permissions.canManageSubscriptionPlans,
      update: permissions.canManageSubscriptionPlans,
      delete: permissions.canManageSubscriptionPlans,
    }
  },


  fields: {
    // photo: relationship({
    //   ref: 'ProductImage.subscription',
    //   ui: {
    //     displayMode: 'cards',
    //     cardFields: ['image', 'altText', 'filename'],
    //     inlineCreate: { fields: ['image', 'altText', 'filename'] },
    //     inlineEdit: { fields: ['image', 'altText', 'filename'] }
    //   }
    // }),
    image: text(),

    // todo does this need to be?
    author: relationship({
      ref: 'User.subscriptionPlans',

      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineConnect: true,
      },

      many: false,
    }),

    name: text({ validation: { isRequired: true } }),
    slug: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      hooks: {
        beforeOperation({resolvedData}) {
          if(!resolvedData?.slug) return console.log('SubPlan: no slug')
          resolvedData.slug = slugFormat(String(resolvedData.slug))
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
        { label: 'Private', value: 'PRIVATE' },
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

    items: relationship({ ref: 'SubscriptionItem.subscriptionPlan', many: true }),

    stockMax: integer({ validation: { isRequired: true }, defaultValue: 0 }),

    tags: relationship({
      ref: 'Tag.subscriptions',
      many: true,
    }),
    categories: relationship({
      ref: 'Category.subscriptions',
      many: true,
    }),

    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
  },


  hooks: {

    beforeOperation: async ({ operation, resolvedData, context, item }) => {

      
      if (operation === 'create') {

        try {
          if (resolvedData && !resolvedData.author) {
            const currentUserId = await context.session.itemId;
            // console.log({ currentUserId });
            resolvedData.author = { connect: { id: currentUserId } };
          }
        } catch (err) { console.warn(err) }
        // console.log('resolvedData.photo.connect.id', resolvedData.photo.connect.id);

        let photo_url = IMG_PLACEHOLDER
        // if (resolvedData?.photo?.connect) {
        //   const photo = await context.db.ProductImage.findOne({
        //     where: {
        //       id: resolvedData.photo.connect.id
        //     }
        //   })
        //   console.log({ photo });
        //   // @ts-ignore
        //   photo_url = photo.image._meta.secure_url
        // }

        const res = await stripeConfig.products.create({
          // id: resolvedData.id, // todo idk if it gets an id 'beforeoperaiton'
          name: resolvedData.name || '',
          active: true,
          description: resolvedData.excerpt ||'no_description',
          metadata: {
            // @ts-ignore //todo might cause problems
            category: resolvedData.categories ? resolvedData.categories[0].name : 'uncategorized',
            status: resolvedData.status || '',
            // @ts-ignore //todo might cause problems
            author: resolvedData.author?.email,
            type: 'subscription'
          },
          images: [
            resolvedData.image || ''
          ],
          // @ts-ignore
          attributes: [
            'Subscriptionattr1',
            'Subscriptionattr2'
          ],
          shippable: false,
          unit_label: 'units',
          default_price_data: {
            currency: 'usd',
            // @ts-ignore //todo might cause problems
            unit_amount: resolvedData.price,
            // @ts-ignore //todo might cause problems
            recurring: { interval: resolvedData.billing_interval},
          },
          url: process.env.FRONTEND_URL + '/shop/subscriptionplan/' + resolvedData.id

        })
          .then(async (res) => {
            // @ts-ignore //todo might cause problems
            if (resolvedData && !resolvedData.product) {
              resolvedData.stripeProductId = res.id
              // @ts-ignore //todo might cause problems
              resolvedData.stripePriceId = res.default_price
            }
          })
          .catch(err => { 
            console.warn(err) 
            throw new Error("subplan create err: " + 'haha uh oh::' + err.message);
            
          })

      }

      if (operation === 'update') {

        let photo_url = IMG_PLACEHOLDER
        // if (resolvedData?.photo?.connect) {
        //   const photo = await context.db.ProductImage.findOne({
        //     where: {
        //       id: resolvedData.photo.connect.id
        //     }
        //   })
        //   console.log({ photo });
        //   // @ts-ignore
        //   photo_url = photo.image._meta.secure_url
        // }

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
            // @ts-ignore //todo might cause problems
            recurring: { interval: resolvedData.billing_interval ? resolvedData.billing_interval : item.billing_interval },
          })

          resolvedData.stripePriceId = newPrice.id

          const product = await stripeConfig.products.update(
            // @ts-ignore //todo might cause problems
            resolvedData.stripeProductId ? resolvedData.stripeProductId : item.stripeProductId,
            {
              name: resolvedData.name ? resolvedData.name : item.name,
              description: resolvedData.excerpt ? resolvedData.excerpt : item.excerpt || 'no_description',
              default_price: newPrice.id,
              images: [
                resolvedData.image
              ],
              metadata: {
                // @ts-ignore //todo might cause problems
                category: resolvedData.categories ? resolvedData.categories[0].name : 'uncategorized',
                status: resolvedData.status,
                // @ts-ignore //todo might cause problems
                author: resolvedData.author?.email,
              }
            }
          )
        } else if (currPrice.unit_amount === item.price) {

          const product = await stripeConfig.products.update(
            // @ts-ignore //todo might cause problems
            resolvedData.stripeProductId ? resolvedData.stripeProductId : item.stripeProductId,
            {
              name: resolvedData.name ? resolvedData.name : item.name,
              // description: resolvedData.description ? resolvedData.description : item.description,
              images: [
                photo_url
              ],
              metadata: {
                // @ts-ignore //todo might cause problems
                category: resolvedData.categories ? resolvedData.categories[0].name : 'uncategorized',
                status: resolvedData.status,
                // @ts-ignore //todo might cause problems
                author: resolvedData.author?.email,
              }
            }
          )
        }
      }

    },
    // afterOperation: async ({ operation, resolvedData, item, context }: { operation: any, resolvedData: any, item: any, context: any }) => {


    // },
  },
})
