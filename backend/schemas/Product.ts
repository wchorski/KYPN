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
    
  }
})
