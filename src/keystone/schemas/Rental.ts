// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-two-servers/keystone-server/src/seed/index.ts
// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-pages-directory/src/pages/index.tsx

import { graphql, list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { decimal, integer, json, relationship, select, text, timestamp, virtual, } from "@keystone-6/core/fields";
import { mailBooking } from "../../lib/mail";
import { User, Addon, Service, Location, } from '../types'
import { calcEndTime, dateCheckAvail, dateOverlapCount, dayOfWeek } from '../../lib/dateCheck';
import { createCalendarEvent, deleteCalendarEvent, updateCalendarEvent } from "../../lib/googleapi/calCreate";
import { datePrettyLocal } from "../../lib/dateFormatter";
import { isLoggedIn, permissions, rules } from "../access";
import { envs } from "../../../envs";


const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // add 1 because getMonth() returns zero-based index
const day = now.getDate();
const today = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`


export const Rental:Lists.Rental = list({

  access: allowAll,
  // access: {
  //   filter: {
  //     query: () => true,
  //     update: rules.canManageBookings,
  //     delete: rules.canManageBookings,
  //   },
  //   operation: {
  //     create: () => true,
  //     query: () => true,
  //     update: isLoggedIn,
  //     delete: isLoggedIn,
  //   }
  // },

  ui: {
    // hide backend from non admins
    listView: {
      initialColumns: ['start', 'end', 'customer', 'status'],
      initialSort: { field: 'start', direction: 'DESC'}
    },
  },


  fields: {
    start: timestamp({ validation: { isRequired: true } }),
    end: timestamp({}),
    // summary: text({validation: { isRequired: true }, defaultValue: '[NEW BOOKING]'}),
    summary: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item:any, args, context) {
          const customer = await context.query.User.findOne({
            where: {id: item.customerId || '' },
            query: `
              name
            `
          }) as User
          return item.start + ' | ' + customer.name;
        },
      })
    }),
    durationInHours: decimal({
      defaultValue: '23',
      precision: 5,
      scale: 2,
      validation: {
        isRequired: true,
        max: '200',
        min: '.25',
      },
    }),
    location: text({validation: { isRequired: true }}),
    price: integer({ defaultValue: 0, validation: { isRequired: true } }),
    email: text(),
    phone: text(),
    name: text(),
    notes: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    cartItems: relationship({ ref: 'CartItem.rentals', many: true }),
    order: relationship({ ref: 'Order.rental', many: false }),
    addons: relationship({ ref: 'Addon.rentals', many: true }),
    // employees: relationship({ ref: 'User.gigs', many: true }),
    customer: relationship({ ref: 'User.rentals', many: false }),
    status: select({
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Postponed', value: 'POSTPONED' },
        { label: 'Canceled', value: 'CANCELED' },
        { label: 'Lead', value: 'LEAD' },
        { label: 'Paid', value: 'PAID' },
        { label: 'Down Payment', value: 'DOWNPAYMENT' },
        { label: 'Hold', value: 'HOLD' },
      ],
      defaultValue: 'LEAD',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
    google: json({
      defaultValue: { 
        id: '',
        status: '',
        kind: '',
        htmlLink: '',
      },
    }),

  },
  // hooks: {
  //   beforeOperation: async ({ operation, resolvedData, context, item }) => {

  //     // if (operation === 'create') {

  //     // }

  //   },
  //   afterOperation: async ({ operation, resolvedData, item, context }) => {

  //   }
  // }
})
