import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp, integer, checkbox } from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';
import { componentBlocks } from "../blocks";
import { permissions, rules } from "../access";
import { slugFormat } from "../../lib/slugFormat";

export const Post:Lists.Post = list({
  
  access: {
    filter: {
      query: rules.canViewPosts,
      update: rules.canManagePosts,
      delete: rules.canManagePosts,
    },
    operation: {
      create: permissions.canManagePosts,
      query: () => true,
      update: permissions.canManagePosts,
      delete: permissions.canManagePosts,
    }
  },
  ui: {

    // todo hide these again
    // isHidden: true,
    listView: {
      initialColumns: ['title', 'status', 'dateModified', 'author',  ],
      initialSort: { field: 'dateModified', direction: 'DESC'}
    },
  },

  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: text({ isIndexed: 'unique', validation: { isRequired: true },
      hooks: {
        beforeOperation({resolvedData}) {
          if(!resolvedData?.slug) return console.log('Post: no slug')
          resolvedData.slug = slugFormat(String(resolvedData.slug))
        },
    }}),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Public', value: 'PUBLIC' },
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
    excerpt: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    featured_image: text(),
    featured_video: text(),

    // the document field can be used for making rich editable content
    //   you can find out more at https://keystonejs.com/docs/guides/document-fields,
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
        [1],
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
      ref: 'User.posts',
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
      ref: 'Category.posts',
      many: true,
    }),
    tags: relationship({
      ref: 'Tag.posts',
      many: true,
    }),
  },
  hooks:{
    beforeOperation: async ({operation, resolvedData, context, item}) => {
      if(operation === 'create'){
        const currUserId = await context.session?.itemId
        
        if(currUserId && !resolvedData.author){
          resolvedData.author= {connect: { id:  currUserId} }
        }
      }
      if(operation === 'update'){
        resolvedData.dateModified = new Date().toISOString()
      }
    }
  }
})