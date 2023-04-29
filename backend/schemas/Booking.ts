// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-two-servers/keystone-server/src/seed/index.ts
// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-pages-directory/src/pages/index.tsx
import {parseISO, isAfter, isBefore, isEqual} from 'date-fns';
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { calendarDay, relationship, text, timestamp, } from "@keystone-6/core/fields";
import { mailBookingCreated } from "../lib/mail";
import { User } from '../types'

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // add 1 because getMonth() returns zero-based index
const day = now.getDate();
const today = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
// console.log(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || 'no_email_set'

// const rightnow = new Date().toISOString()

export const Booking = list({

  access: allowAll,


  ui: {
    // hide backend from non admins
    listView: {
      initialColumns: ['dateTime', 'service', 'customer', 'employees'],
      initialSort: { field: 'dateTime', direction: 'DESC'}
    },
  },


  fields: {
    // date: calendarDay({ validation: { isRequired: true } }),
    dateTime: timestamp({ validation: { isRequired: true } }),
    service: relationship({ ref: 'Service.bookings', many: false }),
    employees: relationship({ ref: 'User.gigs', many: true }),
    customer: relationship({ ref: 'User.bookings', many: false }),
    notes: text({
      ui: {
        displayMode: 'textarea'
      }
    }),

  },
  hooks: {
    beforeOperation: async ({ operation, resolvedData, context, item }) => {
      // try {
      //   if (resolvedData && !resolvedData.user) {
      //     const currentUserId = await context.session.itemId;
      //     // console.log({ currentUserId });
      //     resolvedData.user = { connect: { id: currentUserId } };
      //   }
      // } catch (err) { console.warn(err) }

      if (operation === 'create') {
        console.log(resolvedData.employees.connect)
        

        const bookedEmployees = await context.query.User.findMany({ 
          where: { id: { in: resolvedData.employees.connect.map((user:User) => user.id) }, },
          query: `
            id 
            name
            availability{
              dateTime
              type
              status
              durationInHours
            }
          `
        })
        console.log('+*+*+*+*+*+*+*+*+*+*+*+*+*+*');
        bookedEmployees.map(emp => {
          console.log('---------')
          console.log(emp.name)
          emp.availability.map((avail:any) => {
            console.log(avail.dateTime, avail.type, avail.status, avail.durationInHours);
            
          })
          
          
        })
        
        // console.log({ currSub });

        // if (!resolvedData.custom_price) {
        //   // todo add this for sale or other stuff
        // }

        // const subscription = await stripeConfig.subscriptions.create({
        //   // @ts-ignore
        //   customer: currUser.stripeCustomerId,
        //   items: [
        //     // @ts-ignore
        //     { price: currSub?.stripePriceId, },
        //   ],
        // })
      }

      if (operation === 'update') {

      }
    },
    afterOperation: async ({ operation, resolvedData, item, context }: { operation: any, resolvedData: any, item: any, context: any }) => {
      if (operation === 'create') {
        let customer = {
          name: 'non registered user',
          email: 'non registered user'
        }
        if (item.customer) {
          customer = await context.db.User.findOne({ where: { id: item.customer.id } })
        }
        // console.log({ item });
        // console.log({ resolvedData });
        mailBookingCreated(
          item.id,
          EMAIL_ADDRESS,
          customer.name,
          customer.email,
          item.notes,

        )

      }

    },
  }
})