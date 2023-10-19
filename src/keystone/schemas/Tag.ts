import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { relationship, text, } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";



export const Tag:Lists.Tag = list({

  access: {
    filter: {
      query: () => true,
      update: rules.canManageTags,
      delete: rules.canManageTags,
    },
    operation: {
      create: () => true,
      query: () => true,
      update: permissions.isLoggedIn,
      delete: permissions.isLoggedIn,
    }
  },

  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  // todo hide these again
  // ui: {
  //   isHidden: true,
  // },

  // this is the fields for our Tag list
  fields: {
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    // this can be helpful to find out all the Posts associated with a Tag
    posts: relationship({ ref: 'Post.tags', many: true }),
    pages: relationship({ ref: 'Page.tags', many: true }),
    // products: relationship({ ref: 'Product.tags', many: true }),
    // subscriptions: relationship({ ref: 'SubscriptionPlan.tags', many: true }),
    // events: relationship({ ref: 'Event.tags', many: true }),
    // // bookings: relationship({ ref: 'Booking.tags', many: true }),
    // services: relationship({ ref: 'Service.tags', many: true }),
    // locations: relationship({ ref: 'Location.tags', many: true }),
    // addons: relationship({ ref: 'Addon.tags', many: true }),
  },
})