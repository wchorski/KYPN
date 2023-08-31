import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, text, timestamp, } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import stripe from '../lib/stripe';
import { Context } from '.keystone/types';


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
    dateCreated: timestamp(),
    dateModified: timestamp(),

  },

  hooks: {
    beforeOperation: async ({ operation, resolvedData, context }) => {
      if(operation === 'create'){

        if(!resolvedData.event?.connect) throw new Error("NO EVENT Connect ID FOUND");
        
        const event = await context.db.Event.findOne({
          where: { id: resolvedData.event?.connect.id}
        })
        if(!event) throw new Error("No Event Found");
        console.log({event});
        
        // TODO check to see if Event seats less than or equal to 0. throw error
        // const charge = await stripe.paymentIntents.create({
        //   amount: Number(event.price),
        //   currency: 'USD',
        //   confirm: true,
        //   payment_method: token,
        // }).catch((err: any) => {
        //   console.log(err);
        //   throw new Error(err.message);
        // });

      }


    },
  }
})