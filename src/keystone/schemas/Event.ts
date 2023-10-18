import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, text, timestamp, } from "@keystone-6/core/fields";
import { isLoggedIn, rules } from "../access";
import { document } from '@keystone-6/fields-document';
import { componentBlocks } from "../blocks";

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
    price: integer({defaultValue: 0, validation: {isRequired: true}}),
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