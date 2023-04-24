import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text, } from "@keystone-6/core/fields";



export const Tag = list({

  access: allowAll,

  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  // todo hide these again
  // ui: {
  //   isHidden: true,
  // },

  // this is the fields for our Tag list
  fields: {
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    // this can be helpful to find out all the Posts associated with a Tag
    pages: relationship({ ref: 'Page.tags', many: true }),
    posts: relationship({ ref: 'Post.tags', many: true }),
    products: relationship({ ref: 'Product.tags', many: true }),
    subscriptions: relationship({ ref: 'SubscriptionPlan.tags', many: true }),
    bookings: relationship({ ref: 'Booking.tags', many: true }),
  },
})