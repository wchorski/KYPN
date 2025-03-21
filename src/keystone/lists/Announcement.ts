import { list } from "@keystone-6/core";
import {select, text, timestamp, } from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';

import { colorThemeOptions } from "../../lib/styleHelpers";
import { permissions, rules } from "../access";
import { componentBlocks } from "../blocks";
import type { Lists } from '.keystone/types';

export const Announcement:Lists.Announcement = list({

  access: {
    filter: {
      query: () => true,
      update: rules.canManageAnnouncements,
      delete: rules.canManageAnnouncements,
    },
    operation: {
      create: permissions.canManageAnnouncements,
      query: () => true,
      update: permissions.canManageAnnouncements,
      delete: permissions.canManageAnnouncements,
    }
  },

  ui: {
    hideCreate: (args) => !permissions.canManageAnnouncements(args),
		hideDelete: (args) => !permissions.canManageAnnouncements(args),
		isHidden: (args) => !permissions.canManageAnnouncements(args),

		itemView: {
			defaultFieldMode: ({ session, context, item }) => {
				if (permissions.canManageAnnouncements({ session, context, item })) return "edit"
				return "read"
			},
		},
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
    colorTheme: select({
      options: colorThemeOptions,
      defaultValue: 'bg_c_plain'
    }),
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
  },
})