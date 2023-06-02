import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";



export const Ticket:Lists.Ticket = list({

  // todo only employees of event are allowed to update
  // access: allowAll,
  access: {
    filter: {
      // query: rules.canReadProducts,
      // todo only query if ticket is the holder
      query: () => true,
      // @ts-ignore //todo might cause problems
      delete: rules.canManageTickets,
      // @ts-ignore //todo might cause problems
      update: rules.canManageTickets,
    },
    operation: {
      query: () => true,
      create: permissions.isLoggedIn,
      update: permissions.isLoggedIn,
      delete: permissions.isLoggedIn,
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

    qrcode: text(),
    event: relationship({
      ref: 'Event.tickets',
      many: false,
    }),
    holder: relationship({
      ref: 'User.tickets',
      many: false,
    }),
    status: select({
      options: [
        { label: 'Pending', value: 'PENDING' },
        { label: 'Confirmed', value: 'CONFIRMED' },
        { label: 'Attended', value: 'ATTENDED' },
        { label: 'Canceled', value: 'CANCELED' },
        { label: 'Rejected', value: 'REJECTED' },
        { label: 'Past', value: 'PAST' },
      ],
      defaultValue: 'CONFIRMED',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),

  },
})