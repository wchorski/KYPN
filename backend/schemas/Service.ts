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
    durationInHours2: decimal({ defaultValue: '1' }),
    durationInHours: decimal({
      defaultValue: '1.0',
      precision: 2,
      scale: 1,
      db: { map: 'my_decimal' },
      validation: {
        isRequired: true,
        max: '24',
        min: '.5',
      },
    }),
    employees: relationship({ ref: 'User.services', many: true }),
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