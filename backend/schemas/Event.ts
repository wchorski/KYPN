import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, text, timestamp, } from "@keystone-6/core/fields";
import { isLoggedIn, rules } from "../access";



export const Event:Lists.Event = list({

  // access: allowAll,
  access: {
    filter: {
      // query: rules.canReadProducts,
      query: () => true,
      // @ts-ignore //todo might cause problems
      delete: rules.canManageEvents,
      // @ts-ignore //todo might cause problems
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
      initialColumns: ['start', 'summary', 'location', 'hosts', 'status'],
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
    hosts: relationship({ ref: 'User.eventsHost', many: true }),
    cohosts: relationship({ ref: 'User.eventsCohost', many: true }),
    tickets: relationship({ ref: 'Ticket.event', many: true }),
    seats: integer({ validation: { isRequired: true} }),
    image: text(),
    excerpt: text({
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
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
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