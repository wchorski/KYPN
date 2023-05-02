import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { decimal, integer, relationship, text, timestamp } from "@keystone-6/core/fields";



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
    durationInHours: decimal({
      defaultValue: '24',
      precision: 5,
      scale: 2,
      validation: {
        isRequired: true,
        max: '24',
        min: '.25',
      },
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