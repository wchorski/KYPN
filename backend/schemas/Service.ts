import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { decimal, integer, multiselect, relationship, select, text } from "@keystone-6/core/fields";
import { timesArray } from "../lib/timeArrayCreator";


export const Service:Lists.Service = list({

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
      defaultValue: '09:00:00',
      ui: {
        displayMode: 'select',
        createView: { fieldMode: 'edit' }
      }
    }),
    buisnessHourClosed: select({
      options: timesArray(),
      defaultValue: '18:00:00',
      ui: {
        displayMode: 'select',
      }
    }),
    buisnessDays: multiselect({
      type: 'integer',
      options: [
        { label: 'Sunday',    value: 0 },
        { label: 'Monday',    value: 1 },
        { label: 'Tuesday',   value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday',  value: 4 },
        { label: 'Friday',    value: 5 },
        { label: 'Saturday',  value: 6 },
      ],
      defaultValue: [0, 1, 2, 3, 4, 5, 6]
    }),
    employees: relationship({ ref: 'User.servicesProvided', many: true }),
    locations: relationship({ ref: 'Location.services', many: true }),
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