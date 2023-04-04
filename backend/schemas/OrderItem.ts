import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text } from "@keystone-6/core/fields";


export const OrderItem = list({
  access: allowAll,
  fields: {
    name: text({validation: { isRequired: true }}),
    // slug: text({
    //   validation: { isRequired: true },
    //   isIndexed: 'unique',
    //   hooks: {
    //     validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
    //       const input = resolvedData[fieldKey];
          
    //       if (!input.match(/^[a-z0-9]+(?:-[A-Za-z0-9]+)*$/)) {
    //         addValidationError(`Can only contain lower case "a-z" and dash "-" characters.`);
    //       }
    //     },
    //   }
    // }),
    description: text({ui:{
      displayMode: 'textarea'
    }}),
    photo: relationship({
      ref: 'ProductImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: {fields: ['image', 'altText']},
        inlineEdit: {fields: ['image', 'altText']}
      }
    }),
    price: integer(),
    quantity: integer(),
    order: relationship({ref: 'Order.items'}),
  }
})
