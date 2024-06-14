import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { checkbox, relationship, select, text, timestamp,  } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import stripeConfig, { stripeCustomerCreate, stripeCustomerDelete } from "../../lib/stripe";
import { timesArray } from "../../lib/timeArrayCreator";
// @ts-ignore
import bcrypt from 'bcryptjs'
import { envs } from "../../../envs";
import { User as TypeUser } from "../types";
import { mailVerifyUser } from "../../lib/mail";
import { tokenEmailVerify } from "../../lib/tokenEmailVerify";


export const User: Lists.User = list({
  // access: allowAll,
  access: {
    filter: {
      // todo will this cause privacy problems with clients?
      // query: () => true,
      query: rules.canManageUsers,
      update: rules.canManageUsers,
      // delete: () => false,
    },
    operation: {
      // todo might switch back idk
      // query: permissions.isLoggedIn,
      query: () => true,
      create: () => true,
      // todo NEED TO FIX THIS
      update: permissions.canManageUsers,
      delete: permissions.canManageUsers,
    },
  },

  ui: {
    // hide backend from non admins
    hideCreate: args => !permissions.canManageUsers(args),
    listView: {
      initialColumns: ['name', 'nameLast', 'email', 'role'],
      initialSort: { field: 'dateCreated', direction: 'DESC'}
    },
  },



  // this is the fields for our User list
  fields: {
    // by adding isRequired, we enforce that every User should have a name
    //   if no name is provided, an error will be displayed
    name: text({ validation: { isRequired: true } }),
    nameLast: text(),
    authId: text({isIndexed: 'unique', validation: { isRequired: true } }),
    image: text({}),
    phone: text({}),
    email: text({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same
      // email as another user - this may or may not be a good idea for your project
      isIndexed: 'unique',
    }),


    password: text({
      access: {
        read: () => true,
      },
      hooks: { beforeOperation: async ({ operation,resolvedData}) => {

        if(operation === 'create' || operation === 'update'){
          if(!resolvedData?.password) return console.log('no password set');
          const hash = await bcrypt.hash(resolvedData?.password, envs.WORK_FACTOR)
          resolvedData.password = hash
        }

      }}
    }),
    url: text(),
    isAdmin: checkbox({ defaultValue: false }),
    isActive: checkbox({ defaultValue: true }),
    // stripeCustomerId: text({ defaultValue: `NO_ID_${Math.random().toString(36).slice(10, 12)}`, isIndexed: 'unique' }),
    stripeCustomerId: text(),

    // we can use this field to see what Posts this User has authored
    //   more on that in the Post list below
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
    createdAt: timestamp({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: 'now' },
    }),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
    isVerified: checkbox(),
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
    posts: relationship({ ref: 'Post.author', many: true }),
    pages: relationship({ ref: 'Page.author', many: true }),
    servicesProvided: relationship({ ref: 'Service.employees', many: true }),
    bookings: relationship({ ref: 'Booking.customer', many: true }),
    gigs: relationship({ ref: 'Booking.employees', many: true }),
    gig_requests: relationship({ ref: 'Booking.employee_requests', many: true }),
    eventsHost: relationship({ ref: 'Event.hosts', many: true }),
    eventsCohost: relationship({ ref: 'Event.cohosts', many: true }),
    availability: relationship({ ref: 'Availability.employee', many: true }),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' }
      }
    }),

    products: relationship({ ref: 'Product.author', many: true }),
    rentals: relationship({ ref: 'Rental.customer', many: true }),
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
  },
  hooks: {
    beforeOperation: async ({ operation, resolvedData, item }: { operation: any, resolvedData: any, item:any }) => {

      if (operation === 'create') {

        if(stripeConfig){
          const customer = await stripeCustomerCreate({
            email: resolvedData.email,
            name: resolvedData.name + ' ' + resolvedData.nameLast,
            isActive: resolvedData.isActive,
            
          })
            .then(async (customer) => {
  
              if (resolvedData && !resolvedData.user && customer) {
                resolvedData.stripeCustomerId = customer.id
              } 
            })
            .catch(err => { console.log(err) })
        }

      }

      if(operation === 'delete'){
        if(stripeConfig){
          // todo - delete all stripe data too
          // https://stripe.com/docs/financial-connections/disconnections
          const deleted = await stripeCustomerDelete(item.stripeCustomerId)
            .catch(error => console.log('!!! stripe customer delete error: ', error))
        }
      }
    },

    afterOperation: async ({ operation, resolvedData, item }) => {

      if(operation === 'create'){

        if(envs.MAIL_PASS){
          const token = await tokenEmailVerify({email: item.email, id: item.id})
  
          const mail = await mailVerifyUser({
            to: [item.email, envs.ADMIN_EMAIL_ADDRESS],
            token,
            user: {
              email: item.email,
              name: item.name,
              id: item.id,
            },
          })
        } else {
          console.log('!!! User.ts. Email SMTP not setup')
        }

      }


      if (operation === 'update') {

        const customer = await stripeConfig.customers.update(
          // @ts-ignore
          item.stripeCustomerId,
          {
            // ...item,
            email: item.email,
            name: item.name,
            metadata: {
              // isActive: item.isActive,
              isActive: String(item.isActive),
            }
          }
        )
          .catch(err => { console.warn(err) })
      }

    },
  },
})