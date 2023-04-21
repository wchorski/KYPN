import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text } from "@keystone-6/core/fields";
import { isLoggedIn, permissions, rules } from "../access";
import stripeConfig from "../lib/stripe";

export const Product = list({
  // access: allowAll,
  access: {
    filter: {
      // query: rules.canReadProducts,
      query: () => true,
      delete: rules.canManageProducts,
      update: rules.canManageProducts,
    },
    operation: {
      query: () => true,
      create: isLoggedIn,
      update: isLoggedIn,
      delete: isLoggedIn,
    }
  },


  fields: {
    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText', 'filename'],
        inlineCreate: { fields: ['image', 'altText', 'filename'] },
        inlineEdit: { fields: ['image', 'altText', 'filename'] }
      }
    }),
    name: text({ validation: { isRequired: true } }),
    stripeId: text({ defaultValue: 'NO_ID' }),
    slug: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      hooks: {
        validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
          const inputValue = resolvedData[fieldKey];

          if (!inputValue) return
          if (!inputValue.match(/^[a-z0-9]+(?:-[A-Za-z0-9]+)*$/)) {
            addValidationError(`Can only contain lower case "a-z" and dash "-" characters.`);
          }
        },
      }
    }),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Out of Stock', value: 'OUT_OFF_STOCK' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),

    price: integer(),

    stockCount: integer({ validation: { isRequired: true }, defaultValue: 0 }),
    user: relationship({
      ref: 'User.products',
    }),

    tags: relationship({
      // we could have used 'Tag', but then the relationship would only be 1-way
      ref: 'Tag.products',

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
    categories: relationship({
      ref: 'Category.products',
      many: true,
    }),
  },
  hooks: {
    // TODO use this to create a default 'slug' automatically based on product name
    // if no user set, connect to current session user
    beforeOperation: async ({ operation, resolvedData, context }) => {
      try {
        if (resolvedData && !resolvedData.user) {
          const currentUserId = await context.session.itemId;
          console.log({ currentUserId });
          resolvedData.user = { connect: { id: currentUserId } };
        }
      } catch (err) { console.error(err) }

      if (operation === 'create') {

        const res = await stripeConfig.products.create({
          // id: resolvedData.id, // todo idk if it gets an id 'beforeoperaiton'
          name: resolvedData.name,
          active: true,
          description: resolvedData.description,
          metadata: {
            category: resolvedData.categories[0],
            status: resolvedData.status,
            author: resolvedData.user.email,
          },
          images: [
            'https://res.cloudinary.com/dh5vxixzn/image/upload/v1681927213/samples/food/spices.jpg'
          ],
          attributes: [
            'Size',
            'Color'
          ],
          shippable: false,
          // package_dimensions: {
          //   height: 10,
          //   length: 20,
          //   width: 30,
          //   weight: 5
          // },
          unit_label: 'units',
          default_price_data: {
            currency: 'usd',
            unit_amount: resolvedData.price,
          },
          url: process.env.FRONTEND_URL + '/shop/product/' + resolvedData.id

        })
          .then(async (res) => {

            if (resolvedData && !resolvedData.product) {
              resolvedData.stripeId = res.id
            }
          })
          .catch(err => { console.warn(err) })

        // First, create a price for the product
        // const newPrice = await stripeConfig.prices.create({
        //   unit_amount: 1000,
        //   currency: 'usd',
        //   product_data: {
        //     name: 'My Product Price',
        //     // description: 'This is my awesome product!',
        //     metadata: {
        //       category: 'Widgets'
        //     },
        //     // images: [
        //     //   'https://example.com/product-image.jpg'
        //     // ],
        //     // attributes: [
        //     //   { name: 'Size' },
        //     //   { name: 'Color' }
        //     // ],
        //     // shippable: true,
        //     // package_dimensions: {
        //     //   height: 10,
        //     //   length: 20,
        //     //   width: 30,
        //     //   weight: 5
        //     // },
        //     unit_label: 'widget'
        //   }
        // }).then(price => {
        //   // Once the price is created, create the product and associate the price with it
        //   return stripeConfig.products.create({
        //     name: 'My Product product',
        //     description: 'This is my awesome product!',
        //     images: [
        //       'https://example.com/product-image.jpg'
        //     ],
        //     metadata: {
        //       category: 'Widgets'
        //     },
        //     attributes: [
        //       'Size',
        //       'Color'
        //     ],
        //     shippable: true,
        //     package_dimensions: {
        //       height: 10,
        //       length: 20,
        //       width: 30,
        //       weight: 5
        //     },
        //     unit_label: 'widget',
        //     // @ts-ignore
        //     price: price.id
        //   });
        // }).then(product => {
        //   console.log('Product created:', product);
        // }).catch(error => {
        //   console.error('Error creating product:', error);
        // });

      }

    },
    afterOperation: async ({ operation, resolvedData, item }: { operation: any, resolvedData: any, item: any }) => {
      if (operation === 'update') {

        const customer = await stripeConfig.products.update(
          item.stripeId,
          {
            name: item.name,
            // metadata: {
            //   email: item.email,
            //   name: resolvedData.name,
            //   isActive: resolvedData.isActive,
            // }
          }
        )
          .catch(err => { console.warn(err) })
      }

    },
  },
})
