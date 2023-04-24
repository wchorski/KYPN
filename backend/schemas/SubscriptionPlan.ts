import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { image, integer, relationship, select, text } from "@keystone-6/core/fields";
import { isLoggedIn, permissions, rules } from "../access";
import stripeConfig from "../lib/stripe";
import 'dotenv/config'

const SITE_TITLE = process.env.SITE_TITLE || 'Ecommerce '
const IMG_PLACEHOLDER = process.env.FRONTEND_URL + '/assets/product-placeholder.png'

export const SubscriptionPlan = list({
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
      ref: 'ProductImage.subscription',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText', 'filename'],
        inlineCreate: { fields: ['image', 'altText', 'filename'] },
        inlineEdit: { fields: ['image', 'altText', 'filename'] }
      }
    }),

    // todo does this need to be?
    author: relationship({
      ref: 'User.subscriptionPlans',

      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineConnect: true,
      },

      many: false,
    }),

    name: text({ validation: { isRequired: true } }),
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
    stripeProductId: text({ defaultValue: 'NO_PROD_ID' }),
    stripePriceId: text({ defaultValue: 'NO_PRICE_ID' }),
    billing_interval: select({
      options: [
        { label: 'Daily', value: 'day' },
        { label: 'Weekly', value: 'week' },
        { label: 'Monthly', value: 'month' },
        { label: 'Yearly', value: 'year' },
      ],
      defaultValue: 'month',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),

    items: relationship({ ref: 'SubscriptionItem.subscriptionPlan', many: true }),

    stockCount: integer({ validation: { isRequired: true }, defaultValue: 0 }),

    tags: relationship({
      ref: 'Tag.subscriptions',
      many: true,
    }),
    categories: relationship({
      ref: 'Category.subscriptions',
      many: true,
    }),
  },


  hooks: {

    beforeOperation: async ({ operation, resolvedData, context, item }) => {

      try {
        if (resolvedData && !resolvedData.author) {
          const currentUserId = await context.session.itemId;
          // console.log({ currentUserId });
          resolvedData.author = { connect: { id: currentUserId } };
        }
      } catch (err) { console.warn(err) }

      if (operation === 'create') {
        // console.log('resolvedData.photo.connect.id', resolvedData.photo.connect.id);

        let photo_url = IMG_PLACEHOLDER
        if (resolvedData?.photo?.connect) {
          const photo = await context.db.ProductImage.findOne({
            where: {
              id: resolvedData.photo.connect.id
            }
          })
          console.log({ photo });
          // @ts-ignore
          photo_url = photo.image._meta.secure_url
        }

        const res = await stripeConfig.products.create({
          // id: resolvedData.id, // todo idk if it gets an id 'beforeoperaiton'
          name: resolvedData.name,
          active: true,
          description: resolvedData.description,
          metadata: {
            category: resolvedData.categories ? resolvedData.categories[0] : 'uncategorized',
            status: resolvedData.status,
            author: resolvedData.author.email,
            type: 'subscription'
          },
          images: [
            photo_url
          ],
          attributes: [
            'Subscriptionattr1',
            'Subscriptionattr2'
          ],
          shippable: false,
          unit_label: 'units',
          default_price_data: {
            currency: 'usd',
            unit_amount: resolvedData.price,
            recurring: { interval: resolvedData.billing_interval },
          },
          url: process.env.FRONTEND_URL + '/shop/product/' + resolvedData.id

        })
          .then(async (res) => {

            if (resolvedData && !resolvedData.product) {
              resolvedData.stripeProductId = res.id
              resolvedData.stripePriceId = res.default_price
            }
          })
          .catch(err => { console.warn(err) })

      }

      if (operation === 'update') {

        let photo_url = IMG_PLACEHOLDER
        if (resolvedData?.photo?.connect) {
          const photo = await context.db.ProductImage.findOne({
            where: {
              id: resolvedData.photo.connect.id
            }
          })
          console.log({ photo });
          // @ts-ignore
          photo_url = photo.image._meta.secure_url
        }

        const currPrice = await stripeConfig.prices.retrieve(
          resolvedData.stripePriceId ? resolvedData.stripePriceId : item.stripePriceId
        )

        // todo this is ugly, but Stripe API does not support deletion or updating of a price object
        if (resolvedData.price && currPrice.unit_amount !== resolvedData.price) {

          const newPrice = await stripeConfig.prices.create({
            unit_amount: resolvedData.price,
            currency: 'usd',
            product: resolvedData.stripeProductId ? resolvedData.stripeProductId : item.stripeProductId,
            recurring: { interval: resolvedData.billing_interval ? resolvedData.billing_interval : item.billing_interval },
          })

          resolvedData.stripePriceId = newPrice.id

          const product = await stripeConfig.products.update(
            resolvedData.stripeProductId ? resolvedData.stripeProductId : item.stripeProductId,
            {
              name: resolvedData.name ? resolvedData.name : item.name,
              description: resolvedData.description ? resolvedData.description : item.description,
              default_price: newPrice.id,
              images: [
                photo_url
              ],
              metadata: {
                category: resolvedData.categories ? resolvedData.categories[0] : 'uncategorized',
                status: resolvedData.status,
                author: resolvedData.author.email,
              }
            }
          )
        } else if (currPrice.unit_amount === item.price) {

          const product = await stripeConfig.products.update(
            resolvedData.stripeProductId ? resolvedData.stripeProductId : item.stripeProductId,
            {
              name: resolvedData.name ? resolvedData.name : item.name,
              description: resolvedData.description ? resolvedData.description : item.description,
              images: [
                photo_url
              ],
              metadata: {
                category: resolvedData.categories ? resolvedData.categories[0] : 'uncategorized',
                status: resolvedData.status,
                author: resolvedData.author.email,
              }
            }
          )
        }
      }

    },
    // afterOperation: async ({ operation, resolvedData, item, context }: { operation: any, resolvedData: any, item: any, context: any }) => {


    // },
  },
})
