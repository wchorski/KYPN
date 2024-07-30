import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp, integer, } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import { slugFormat } from "../../lib/slugFormat";



export const Category:Lists.Category = list({

  access: {
    filter: {
      query: () => true,
      update: rules.canManageCategories,
      delete: rules.canManageCategories,
    },
    operation: {
      create: permissions.canManageCategories,
      query: () => true,
      update: permissions.canManageCategories,
      delete: permissions.canManageCategories,
    }
  },
  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  // todo hide these again
  // ui: {
  //   isHidden: true,
  // },
  fields: {
    name: text({ 
      isIndexed: 'unique', 
      validation: { isRequired: true } ,
      hooks: {
        beforeOperation({resolvedData}) {
          if(!resolvedData?.name) return console.log('Category: no name')
          resolvedData.name = slugFormat(String(resolvedData.name))
        },
      }
    }),
    // todo make status 'DRAFT' 'PUBLIC' etc
    excerpt: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    posts: relationship({ ref: 'Post.categories', many: true }),
    pages: relationship({ ref: 'Page.categories', many: true }),
  },
})
