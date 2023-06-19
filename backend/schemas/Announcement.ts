import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp, integer,} from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';
import { componentBlocks } from "../blocks";



export const Announcement:Lists.Announcement = list({

  access: allowAll,

  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  // todo hide these again
  // ui: {
  //   isHidden: true,
  // },

  // this is the fields for our Tag list
  fields: {
    link: text(),
    start: timestamp(),
    end: timestamp(),
    content: document({
      componentBlocks,
      ui: {
        views: './blocks',
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
