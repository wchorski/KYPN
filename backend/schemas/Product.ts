import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text } from "@keystone-6/core/fields";


export const Product = list({
  access: allowAll,
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
          const input = resolvedData[fieldKey];
          
          if (!input.match(/^[a-z0-9]+(?:-[A-Za-z0-9]+)*$/)) {
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
    
  }
})
