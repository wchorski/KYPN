import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, password, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import stripeConfig from "../lib/stripe";
import { timesArray } from "../lib/timeArrayCreator";


export const User = list({
  access: {
    filter: {
      // todo will this cause privacy problems with clients?
      query: () => true,
      // query: rules.canManageUsers,
      update: rules.canManageUsers,
      // delete: () => false,
    },
    operation: {
      // todo might switch back idk
      // query: permissions.isLoggedIn,
      query: () => true,
      create: () => true,
      // todo NEED TO FIX THIS
      // update: () => permissions.canManageUsers,
      update: () => true,
      delete: permissions.canManageUsers,
    },
  },

  ui: {
    // hide backend from non admins
    hideCreate: args => !permissions.canManageUsers(args),
    // listView: {
    //   initialColumns: ['', 'createdAt', 'user', 'createdAt']
    // },
  },



  // this is the fields for our User list
  fields: {
    // by adding isRequired, we enforce that every User should have a name
    //   if no name is provided, an error will be displayed
    name: text({ validation: { isRequired: true } }),

    email: text({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same
      // email as another user - this may or may not be a good idea for your project
      isIndexed: 'unique',
    }),

    password: password({ validation: { isRequired: true } }),
    isAdmin: checkbox({ defaultValue: false }),
    isActive: checkbox({ defaultValue: true }),
    stripeCustomerId: text({ defaultValue: `NO_ID_${Math.random().toString(36).slice(2, 12)}`, isIndexed: 'unique' }),

    // we can use this field to see what Posts this User has authored
    //   more on that in the Post list below
    posts: relationship({ ref: 'Post.author', many: true }),
    pages: relationship({ ref: 'Page.author', many: true }),
    servicesProvided: relationship({ ref: 'Service.employees', many: true }),
    bookings: relationship({ ref: 'Booking.customer', many: true }),
    gigs: relationship({ ref: 'Booking.employees', many: true }),
    gigevents: relationship({ ref: 'Event.employees', many: true }),
    availability: relationship({ ref: 'Availability.employee', many: true }),
    buisnessHourOpen: select({
      options: timesArray(),
      defaultValue: '09:00:00',
      ui: {
        displayMode: 'select',
        createView: { fieldMode: 'edit' }
      }
    }),
    buisnessHourClosed: select({
      options: timesArray(),
      defaultValue: '18:00:00',
      ui: {
        displayMode: 'select',
      }
    }),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' }
      }
    }),

    createdAt: timestamp({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: 'now' },
    }),
    products: relationship({ ref: 'Product.author', many: true }),
    subscriptionPlans: relationship({ ref: 'SubscriptionPlan.author', many: true }),
    subscriptions: relationship({ ref: 'SubscriptionItem.user', many: true }),
    orders: relationship({
      ref: 'Order.user',
      many: true,
    }),
    tickets: relationship({
      ref: 'Ticket.holder',
      many: true,
    }),
    role: relationship({
      ref: 'Role.assignedTo',
      // todo add access control
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers
      },
      // ui: {
      //   createView: { fieldMode: 'hidden' },
      //   itemView: { fieldMode: 'hidden' }
      // }
    }),
    dateCreated: timestamp({defaultValue: String(new Date().toISOString())}),
    dateModified: timestamp({defaultValue: String(new Date().toISOString())}),
  },
  hooks: {
    beforeOperation: async ({ operation, resolvedData }: { operation: any, resolvedData: any }) => {

      if (operation === 'create') {
        const customer = await stripeConfig.customers.create({
          email: resolvedData.email,
          name: resolvedData.name,
          metadata: {
            isActive: resolvedData.isActive,
          }
        })
          .then(async (customer) => {

            if (resolvedData && !resolvedData.user) {
              resolvedData.stripeCustomerId = customer.id
            } ``
          })
          .catch(err => { console.warn(err) })
      }
    },

    afterOperation: async ({ operation, resolvedData, item }: { operation: any, resolvedData: any, item: any }) => {
      if (operation === 'update') {

        const customer = await stripeConfig.customers.update(
          item.stripeCustomerId,
          {
            // ...item,
            email: item.email,
            name: item.name,
            metadata: {
              isActive: item.isActive,
            }
          }
        )
          .catch(err => { console.warn(err) })
      }

    },
  },
})