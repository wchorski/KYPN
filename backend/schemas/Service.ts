import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { decimal, integer, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { timesArray } from "../lib/timeArrayCreator";


export const Service = list({

  access: allowAll,

  // todo hide these again
  // ui: {
  //   isHidden: true,
  // },


  fields: {
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    price: integer({ defaultValue: 0 }),
    addons: relationship({ref: 'Addon.services', many: true}),
    durationInHours: decimal({
      defaultValue: '6',
      precision: 5,
      scale: 2,
      validation: {
        isRequired: true,
        max: '24',
        min: '.25',
      },
    }),
    buisnessHourOpen: select({
      options: timesArray(),
      defaultValue: '09:00',
      ui: {
        displayMode: 'select',
        createView: { fieldMode: 'edit' }
      }
    }),
    buisnessHourClosed: select({
      options: timesArray(),
      defaultValue: '18:00',
      ui: {
        displayMode: 'select',
      }
    }),
    employees: relationship({ ref: 'User.servicesProvided', many: true }),
    bookings: relationship({ ref: 'Booking.service', many: true }),
    
    categories: relationship({
      ref: 'Category.services',
      many: true,
    }),

    tags: relationship({
      ref: 'Tag.services',
      many: true,
    }),
  },
})