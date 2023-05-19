import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, text, } from "@keystone-6/core/fields";



export const Location = list({

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
    address: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    rooms: integer({ defaultValue: 1 }),
    services: relationship({ ref: 'Service.locations', many: true }),
    bookings: relationship({ ref: 'Booking.location', many: true }),
    events: relationship({ ref: 'Event.location', many: true }),
    
    categories: relationship({
      ref: 'Category.locations',
      many: true,
    }),
    tags: relationship({
      ref: 'Tag.locations',
      many: true,
    }),
  },
})