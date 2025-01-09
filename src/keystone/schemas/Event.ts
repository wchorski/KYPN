import { graphql, list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, text, timestamp, virtual, } from "@keystone-6/core/fields";
import { isLoggedIn, rules } from "../access";
import { document } from '@keystone-6/fields-document';
import { componentBlocks } from "../blocks";

export const Event:Lists.Event = list({

  // access: allowAll,
  access: {
    filter: {
      // query: rules.canReadProducts,
      // TODO if private events then create canViewEvents
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
      initialColumns: ['start', 'summary', 'location', 'hosts', 'status'],
      initialSort: { field: 'start', direction: 'DESC'}
    },
  },


  fields: {
    typeof: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve() {
          return "event";
        },
      }),
      ui: {
        itemView: { fieldMode: 'hidden'}
      }
    }),
    summary: text({validation: { isRequired: true }, defaultValue: '[NEW]'}),
    start: timestamp({ validation: { isRequired: true } }),
    end: timestamp({}),
    price: integer({defaultValue: 0, validation: {isRequired: true}}),    
    seats: integer({ validation: { isRequired: true} }),
    image: text(),
    excerpt: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    description: document({
      componentBlocks,
      ui: {
        views: './src/keystone/blocks',
      },
      formatting: {
        inlineMarks: {
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
          code: true,
          superscript: true,
          subscript: true,
          keyboard: true,
        },
        listTypes: {
          ordered: true,
          unordered: true,
        },
        alignment: {
          center: true,
          end: true,
        },
        headingLevels: [2, 3, 4, 5, 6],
        blockTypes: {
          blockquote: true,
          code: true
        },
        softBreaks: true,
      },
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
    status: select({
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Postponed', value: 'POSTPONED' },
        { label: 'Canceled', value: 'CANCELED' },
        { label: 'Past', value: 'PAST' },
        { label: 'Draft', value: 'DRAFT' },
      ],
      defaultValue: 'ACTIVE',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    location: relationship({ ref: 'Location.events', many: false }),
    hosts: relationship({ ref: 'User.eventsHost', many: true }),
    cohosts: relationship({ ref: 'User.eventsCohost', many: true }),
    tickets: relationship({ ref: 'Ticket.event', many: true }),
    coupons: relationship({ ref: 'Coupon.events', many: true }),
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