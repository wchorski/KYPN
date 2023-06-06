import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, text, } from "@keystone-6/core/fields";



export const Addon:Lists.Addon = list({

  access: allowAll,

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
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    description: text(),
    price: integer({defaultValue: 0}),
    services: relationship({ ref: 'Service.addons', many: true }),
    bookings: relationship({ ref: 'Booking.addons', many: true }),
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
})