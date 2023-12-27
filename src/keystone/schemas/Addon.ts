import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, text, } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import { slugFormat } from "../../lib/slugFormat";
import { stripeProductCreate } from "../../lib/stripe";
import { envs } from "../../../envs";

export const Addon:Lists.Addon = list({

  access: {
    filter: {
      query: () => true,
      update: rules.canManageAddons,
      delete: rules.canManageAddons,
    },
    operation: {
      create: () => true,
      query: () => true,
      update: permissions.isLoggedIn,
      delete: permissions.isLoggedIn,
    }
  },

  // todo hide these again
  // ui: {
  //   // hide backend from non admins
  // isHidden: true,
  //   listView: {
  //     initialColumns: ['dateTime', 'service', 'customer', 'employees'],
  //     initialSort: { field: 'dateTime', direction: 'DESC'}
  //   },
  // },


  fields: {
    name: text({ isIndexed: 'unique', validation: { isRequired: true }}),
    slug: text({ isIndexed: 'unique', validation: { isRequired: true },
      hooks: {
        beforeOperation({resolvedData,}) {
          if(!resolvedData?.slug) return console.log('Addon: no slug set')
          resolvedData.slug = slugFormat(String(resolvedData.slug))
        },
    }}),
    image: text(),
    excerpt: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    price: integer({defaultValue: 0}),
    stripeProductId: text(),
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
    services: relationship({ ref: 'Service.addons', many: true }),
    products: relationship({ ref: 'Product.addons', many: true }),
    subscriptionPlans: relationship({ ref: 'SubscriptionPlan.addons', many: true }),
    bookings: relationship({ ref: 'Booking.addons', many: true }),
    subscriptionItems: relationship({ ref: 'SubscriptionItem.addons', many: true }),
    // products: relationship({}),

    categories: relationship({
      ref: 'Category.addons',
      many: true,
    }),

    tags: relationship({
      ref: 'Tag.addons',
      many: true,
    }),
  },
  hooks: {

    beforeOperation: async ({ operation, resolvedData, context, item }) => {

      
      if (operation === 'create') {
  

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
          url: envs.FRONTEND_URL + '/shop/subscriptionplans/' + resolvedData.id,
          // authorEmail: resolvedData.author || 'no_author',
          authorEmail: 'no_author',
        })
          .then(async (res) => {
            // console.log({res});
            

            if (res && resolvedData) {
              resolvedData.stripeProductId = res.id
            }
          })
          .catch(err => { 
            console.log(err) 
            throw new Error("subplan create err: " + 'haha uh oh::' + err.message);
            
          })
      }

    }
  },
})