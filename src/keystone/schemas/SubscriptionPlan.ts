import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text, timestamp,  } from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';
import { permissions, rules } from "../access";
import { stripeProductCreate, stripeProductUpdate } from "../../lib/stripe";
import 'dotenv/config'
import { componentBlocks } from "../blocks";
import { slugFormat } from "../../lib/slugFormat";
import { Billing_Interval } from "@ks/types";
import { envs } from "../../../envs";

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

    price: integer({validation: {isRequired: true}}),
    stripeProductId: text(),
    stripePriceId: text(),
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

    
    stockMax: integer({ validation: { isRequired: true }, defaultValue: 0 }),
    
    addons: relationship({ref: 'Addon.subscriptionPlans', many: true}),
    coupons: relationship({ref: 'Coupon.subscriptionPlans', many: true}),
    items: relationship({ ref: 'SubscriptionItem.subscriptionPlan', many: true }),
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
            const currentUserId = await context.session?.itemId;
            resolvedData.author = { connect: { id: currentUserId } };
          }
        } catch (err) { console.warn(err) }
        

        const res = await stripeProductCreate({
          id: resolvedData.id || '',
          name: resolvedData.name || '',
          description: resolvedData.excerpt || '',
          // category: resolvedData.categories ? resolvedData.categories[0].name : 'uncategorized',
          category: 'uncategorized',
          status: resolvedData.status || '',
          type: 'subscription',
          image: resolvedData.image || '',
          price: Number(resolvedData.price),
          billing_interval: resolvedData.billing_interval as Billing_Interval,
          url: envs.FRONTEND_URL + '/shop/subscriptionplans/' + resolvedData.id,
          // authorEmail: resolvedData.author || 'no_author',
          authorEmail: 'no_author',
        })
          .then(async (res) => {
            // @ts-ignore //todo might cause problems
            if (res && resolvedData && !resolvedData.product) {
              resolvedData.stripeProductId = res.id
              // @ts-ignore //todo might cause problems
              resolvedData.stripePriceId = res.default_price
            }
          })
          .catch(err => { 
            console.log(err) 
            throw new Error("subplan create err: " + 'haha uh oh::' + err.message);
            
          })

      }

      if (operation === 'update') {

        const product = await stripeProductUpdate({
          currency: 'usd',
          productId: item.id,
          stripeProductId: String(resolvedData.stripePriceId) || item.stripeProductId,
          stripePriceId: item.stripePriceId,
          price: Number(resolvedData.price) || Number(item.price),
          image: String(resolvedData.image) || item.image || '',
          name: String(resolvedData.name) || item.name,
          status: String(resolvedData.status) || item.name,
          category: '',
          excerpt: String(resolvedData.excerpt) || item.excerpt || '',
          authorEmail: '',
          billing_interval: resolvedData.billing_interval as Billing_Interval || item.billing_interval,

        }).then( async (product) => {
          
          if(!product) return 
          // @ts-ignore
          resolvedData.stripePriceId = product.default_price || '' 
        }).catch(err => {
          console.log(err)
          throw new Error(err)
        })
      
      }

    },
    // afterOperation: async ({ operation, resolvedData, item, context }: { operation: any, resolvedData: any, item: any, context: any }) => {


    // },
  },
})
