import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, text, timestamp, } from "@keystone-6/core/fields";
import { isLoggedIn, rules } from "../access";



export const Event = list({

  // access: allowAll,
  access: {
    filter: {
      // query: rules.canReadProducts,
      query: () => true,
      delete: rules.canManageEvents,
      update: rules.canManageEvents,
    },
    operation: {
      query: () => true,
      create: isLoggedIn,
      update: isLoggedIn,
      delete: isLoggedIn,
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

  ui: {
    // hide backend from non admins
    listView: {
      initialColumns: ['start', 'summary', 'location', 'host', 'status'],
      initialSort: { field: 'start', direction: 'DESC'}
    },
  },


  fields: {
    summary: text({validation: { isRequired: true }, defaultValue: '[NEW]'}),
    location: relationship({ ref: 'Location.events', many: false }),
    start: timestamp({ validation: { isRequired: true } }),
    end: timestamp({}),
    price: integer({defaultValue: 0}),
    // todo have multiple hosts
    host: relationship({ ref: 'User.eventsHost', many: false }),
    cohosts: relationship({ ref: 'User.eventsCohost', many: true }),
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