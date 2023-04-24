import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp, integer, checkbox } from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';
// @ts-ignore
import { componentBlocks } from "../blocks";

export const Page = list({

  access: allowAll,


  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    dateCreated: timestamp({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: 'now' },
    }),
    dateModified: timestamp({
      defaultValue: { kind: 'now' },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Published', value: 'PUBLISHED' },
        { label: 'Private', value: 'PRIVATE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    template: select({
      options: [
        { label: 'Full Width', value: 'FULLWIDTH' },
        { label: 'With Sidebar', value: 'WITHSIDEBAR' },
        { label: 'Blank', value: 'BLANK' },
      ],
      defaultValue: 'FULLWIDTH',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    pinned: integer({ defaultValue: 0 }),
    excerpt: text(),
    featured_image: text(),
    featured_video: text(),

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


    author: relationship({

      ref: 'User.pages',

      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineConnect: true,
      },

      many: false,
    }),
    categories: relationship({
      ref: 'Category.pages',
      many: true,
    }),

    tags: relationship({
      ref: 'Tag.pages',
      many: true,
    }),

  },
})