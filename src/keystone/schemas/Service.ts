import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { decimal, integer, multiselect, relationship, select, text } from "@keystone-6/core/fields";
import { timesArray } from "../../lib/timeArrayCreator";
import { permissions, rules } from "../access";


export const Service:Lists.Service = list({

  access: {
    filter: {
      query: () => true,
      update: rules.canManageServices,
      delete: rules.canManageServices,
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
  //   isHidden: true,
  // },


  fields: {
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    image: text(),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    price: integer({ defaultValue: 0 }),
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
    addons: relationship({ref: 'Addon.services', many: true}),
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