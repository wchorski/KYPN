import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, text, timestamp, } from "@keystone-6/core/fields";



export const Event = list({

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

  ui: {
    // hide backend from non admins
    listView: {
      initialColumns: ['start', 'summary', 'location', 'employees', 'status'],
      initialSort: { field: 'start', direction: 'DESC'}
    },
  },


  fields: {
    summary: text({validation: { isRequired: true }, defaultValue: '[NEW]'}),
    location: relationship({ ref: 'Location.events', many: false }),
    start: timestamp({ validation: { isRequired: true } }),
    end: timestamp({}),
    price: integer({defaultValue: 0}),
    employees: relationship({ ref: 'User.gigevents', many: true }),
    tickets: relationship({ ref: 'Ticket.event', many: true }),
    seats: integer({ validation: { isRequired: true} }),
    photo: text(),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    status: select({
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Postponed', value: 'POSTPONED' },
        { label: 'Canceled', value: 'CANCELED' },
        { label: 'Past', value: 'PAST' },
      ],
      defaultValue: 'ACTIVE',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    dateCreated: timestamp({defaultValue: String(new Date().toISOString())}),
    dateModified: timestamp({defaultValue: String(new Date().toISOString())}),
    categories: relationship({
      ref: 'Category.events',
      many: true,
    }),

    tags: relationship({
      ref: 'Tag.events',
      many: true,
    }),
  },
})