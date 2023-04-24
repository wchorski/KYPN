import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text, } from "@keystone-6/core/fields";



export const Booking = list({

  access: allowAll,

  // todo hide these again
  // ui: {
  //   isHidden: true,
  // },


  fields: {
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),

    categories: relationship({
      ref: 'Category.bookings',
      many: true,
    }),

    tags: relationship({
      ref: 'Tag.bookings',
      many: true,
    }),
  },
})