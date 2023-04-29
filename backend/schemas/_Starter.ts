import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text, } from "@keystone-6/core/fields";



export const STARTER = list({

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

    categories: relationship({
      ref: 'Category.STARTERS',
      many: true,
    }),

    tags: relationship({
      ref: 'Tag.STARTERS',
      many: true,
    }),
  },
})