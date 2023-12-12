import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp, integer,} from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';
import { componentBlocks } from "../blocks";
import { permissions, rules } from "../access";



export const Announcement:Lists.Announcement = list({

  access: {
    filter: {
      query: () => true,
      update: rules.canManageAnnouncements,
      delete: rules.canManageAnnouncements,
    },
    operation: {
      create: () => true,
      query: () => true,
      update: permissions.isLoggedIn,
      delete: permissions.isLoggedIn,
    }
  },

  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  // todo hide these again
  ui: {

    // todo hide these again
    // isHidden: true,
    listView: {
      initialColumns: ['link', 'start', 'end', 'type' ],
      initialSort: { field: 'start', direction: 'DESC'}
    },
  },

  // this is the fields for our Tag list
  fields: {
    link: text(),
    start: timestamp(),
    end: timestamp(),
    color: text({defaultValue: '#00000094'}),
    type: select({
      options: [
        { label: 'Site Maitenance', value: 'MAINTENANCE' },
        { label: 'Normal', value: 'NORMAL' },
        { label: 'Critical', value: 'CRITICAL' },
        { label: 'Sale', value: 'SALE' },
      ],
      defaultValue: 'NORMAL',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    content: document({
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
    // this can be helpful to find out all the Posts associated with a Tag
    // pages: relationship({ ref: 'Page.categories', many: true }),
    // posts: relationship({ ref: 'Post.categories', many: true }),
    // products: relationship({ ref: 'Product.categories', many: true }),
    // subscriptions: relationship({ ref: 'SubscriptionPlan.categories', many: true }),
    // events: relationship({ ref: 'Event.categories', many: true }),
    // // bookings: relationship({ ref: 'Booking.categories', many: true }),
    // services: relationship({ ref: 'Service.categories', many: true }),
    // locations: relationship({ ref: 'Location.categories', many: true }),
    // addons: relationship({ ref: 'Addon.categories', many: true }),
  },
})
