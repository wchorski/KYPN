import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp, integer, } from "@keystone-6/core/fields";



export const Category:Lists.Category = list({

  access: allowAll,

  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  // todo hide these again
  // ui: {
  //   isHidden: true,
  // },

  // this is the fields for our Tag list
  fields: {
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    // this can be helpful to find out all the Posts associated with a Tag
    pages: relationship({ ref: 'Page.categories', many: true }),
    posts: relationship({ ref: 'Post.categories', many: true }),
    products: relationship({ ref: 'Product.categories', many: true }),
    subscriptions: relationship({ ref: 'SubscriptionPlan.categories', many: true }),
    events: relationship({ ref: 'Event.categories', many: true }),
    // bookings: relationship({ ref: 'Booking.categories', many: true }),
    services: relationship({ ref: 'Service.categories', many: true }),
    locations: relationship({ ref: 'Location.categories', many: true }),
    addons: relationship({ ref: 'Addon.categories', many: true }),
  },
})
