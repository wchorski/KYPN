import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text } from "@keystone-6/core/fields";
import { isLoggedIn, rules } from "../access";


export const Product = list({
  // access: allowAll,
  access: {
    // filter: {
    //   update: rules.canManageProducts
    // },
    operation: {
      query: () => true,
      create: () => true,
      update: () => true,
      delete: () => true,
    }
  },

  
  fields: {
    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: {fields: ['image', 'altText']},
        inlineEdit: {fields: ['image', 'altText']}
      }
    }),
    name: text({validation: { isRequired: true }}),
    slug: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      hooks: {
        validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
          const inputValue = resolvedData[fieldKey];

          if(!inputValue) return 
          if (!inputValue.match(/^[a-z0-9]+(?:-[A-Za-z0-9]+)*$/)) {
            addValidationError(`Can only contain lower case "a-z" and dash "-" characters.`);
          }
        },
      }
    }),
    description: text({ui:{
      displayMode: 'textarea'
    }}),
    status: select({
      options: [
        {label: 'Draft', value: 'DRAFT'},
        {label: 'Available', value: 'AVAILABLE'},
        {label: 'Out of Stock', value: 'OUT_OFF_STOCK'},
      ],
      defaultValue: 'DRAFT',
      ui:{
        displayMode: 'segmented-control',
        createView: {fieldMode: 'edit'}
      }
    }),

    price: integer(),

    stockCount: integer({ validation: { isRequired: true}, defaultValue: 0}),
    user: relationship({
      ref: 'User.products',
    }),

    tags: relationship({
      // we could have used 'Tag', but then the relationship would only be 1-way
      ref: 'Tag.products',

      // a Post can have many Tags, not just one
      many: true,

      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: 'cards',
        cardFields: ['name'],
        inlineEdit: { fields: ['name'] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ['name'] },
      },
    }),
    
  }
})
