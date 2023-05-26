import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, } from "@keystone-6/core/fields";



export const Ticket = list({

  // todo only employees of event are allowed to update
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