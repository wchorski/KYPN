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
      // query: rules.canReadProducts,
      // TODO TODO TODO TODO only query if ticket is the holder
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
  ui: {
    // hide backend from non admins
    // isHidden: true,
    listView: {
      initialColumns: ['eventStart', 'eventSummary', 'email', 'status',],
      initialSort: { field: 'eventStart', direction: 'ASC'}
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
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),

  },

  // hooks: {
  //   beforeOperation: async ({ operation, resolvedData, context }) => {
  //     if(operation === 'create'){

  //       if(!resolvedData.event?.connect) throw new Error("NO EVENT Connect ID FOUND");
        
  //       const event = await context.db.Event.findOne({
  //         where: { id: resolvedData.event?.connect.id}
  //       })
  //       if(!event) throw new Error("No Event Found");
  //       // console.log({event});


  //     }


  //   },
  // }
})