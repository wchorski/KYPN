import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, text, } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";



export const Location:Lists.Location = list({

  access: {
    filter: {
      query: () => true,
      update: rules.canManageLocations,
      delete: rules.canManageLocations,
    },
    operation: {
      create: permissions.canManageLocations,
      query: () => true,
      update: permissions.canManageLocations,
      delete: permissions.canManageLocations,
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
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    address: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    rooms: integer({ defaultValue: 1 }),
    services: relationship({ ref: 'Service.locations', many: true }),
    bookings: relationship({ ref: 'Booking.location', many: true }),
    // events: relationship({ ref: 'Event.location', many: true }),
    
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