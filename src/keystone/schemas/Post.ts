import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp, integer, checkbox } from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';
// @ts-ignore
import { componentBlocks } from "../blocks";
import { permissions, rules } from "../access";
import { slugFormat } from "../../lib/slugFormat";

export const Post:Lists.Post = list({
  
  access: {
    filter: {
      // query: () => true,
      query: rules.canViewPosts,
      // todo make intricate view rule to hide Draft or private posts
      // query: rules.canManagePosts,
      update: rules.canManagePosts,
      delete: rules.canManagePosts,
    },
    operation: {
      // todo, not everyone should be able to create
      create: () => true,
      // query: permissions.canViewPosts,
      query: () => true,
      update: permissions.canManagePosts,
      delete: permissions.canManagePosts,
    }
  },
  ui: {

    // todo hide these again
    // isHidden: true,
    listView: {
      initialColumns: ['title', 'status', 'dateModified', 'author', 'categories' ],
      initialSort: { field: 'dateModified', direction: 'DESC'}
    },
  },

  // this is the fields for our Post list
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

    // todo make comments schema
    allow_comments: checkbox({ defaultValue: false }),

    // with this field, you can set a User as the author for a Post
    author: relationship({
      // we could have used 'User', but then the relationship would only be 1-way
      ref: 'User.posts',

      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineConnect: true,
      },

      // a Post can only have one author
      //   this is the default, but we show it here for verbosity
      many: false,
    }),
    categories: relationship({
      ref: 'Category.posts',
      many: true,
    }),
    // with this field, you can add some Tags to Posts
    tags: relationship({
      // we could have used 'Tag', but then the relationship would only be 1-way
      ref: 'Tag.posts',

      // a Post can have many Tags, not just one
      many: true,

      // this is some customisations for changing how this will look in the AdminUI
      // ui: {
      //   displayMode: 'cards',
      //   cardFields: ['name'],
      //   inlineEdit: { fields: ['name'] },
      //   linkToItem: true,
      //   inlineConnect: true,
      //   inlineCreate: { fields: ['name'] },
      // },
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
    }
  }
})