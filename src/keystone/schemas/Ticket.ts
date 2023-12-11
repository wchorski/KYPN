import { graphql, list } from "@keystone-6/core";
// @ts-ignore
import type { Lists, Context } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, text, timestamp, virtual, } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import { Event } from "@ks/types";
import { datePrettyLocalDay } from "../../lib/dateFormatter";

export const Ticket:Lists.Ticket = list({

  // todo only employees of event are allowed to update
  // access: allowAll,
  access: {
    filter: {
      // query: () => true,
      query: rules.canManageTickets,
      delete: rules.canManageTickets,
      update: rules.canManageTickets,
    },
    operation: {
      // query: () => true,
      query: permissions.isLoggedIn,
      create: permissions.isLoggedIn,
      update: permissions.isLoggedIn,
      delete: permissions.isLoggedIn,
    }
  },

  // todo hide these again
  ui: {
    // hide backend from non admins
    // isHidden: true,
    listView: {
      initialColumns: ['eventStart', 'eventSummary', 'email', 'status',],
      // initialSort: { field: 'eventStart', direction: 'ASC'}
    },
  },


  fields: {
    eventSummary: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item:any, args, context) {
          const event = await context.query.Event.findOne({
            where: {id: item.eventId || '' },
            query: `
              summary
            `
          }) as Event
          return event.summary;
        },
      })
    }),
    eventStart: virtual({
      field: graphql.field({
        type: graphql.DateTime,
        async resolve(item:any, args, context) {
          const event = await context.query.Event.findOne({
            where: {id: item.eventId || ''},
            query: `
              start
            `
          }) as Event
          return new Date(event.start);
        },
      })
    }),
    qrcode: text(),
    event: relationship({
      ref: 'Event.tickets',
      many: false,
    }),
    email: text(),
    holder: relationship({
      ref: 'User.tickets',
      many: false,
    }),
    orderCount: text(),
    cost: integer({validation: {isRequired: true}, defaultValue: 0}),
    chargeId: text(),
    order: relationship({ ref: 'Order.ticketItems' }),
    status: select({
      options: [
        { label: 'Pending', value: 'PENDING' },
        { label: 'Confirmed', value: 'CONFIRMED' },
        { label: 'Paid', value: 'PAID' },
        { label: 'Unpaid', value: 'UNPAID' },
        { label: 'Attended', value: 'ATTENDED' },
        { label: 'Canceled', value: 'CANCELED' },
        { label: 'Rejected', value: 'REJECTED' },
        { label: 'Past', value: 'PAST' },
      ],
      defaultValue: 'PAID',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),

  },

  hooks: {
    beforeOperation: async ({ operation, resolvedData, context, item }) => {
      if(operation === 'create'){
        // if event has started, don't allow purchase of ticket

        if(!resolvedData.event?.connect?.id) return
        
        const event = await context.db.Event.findOne({
          where: { id: resolvedData.event.connect.id }
        })
        if(!event) throw new Error('!!! Event not found for Ticket')

        const now = new Date()
        const eventStart = new Date(event.start)
        if(now > eventStart) throw new Error('!!! Ticket: Event has already started')
        
      }
    
      if(operation === 'update'){

        if(item.status === 'ATTENDED') {
          // console.log(`!!!!!!!! This ticket has already been redeemed: ${item.id}`);
          throw new Error(`!!! This ticket has already been redeemed: ${item.id}`)
        }
      }


    },
  }
})