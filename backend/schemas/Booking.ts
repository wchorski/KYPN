// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-two-servers/keystone-server/src/seed/index.ts
// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-pages-directory/src/pages/index.tsx
import {parseISO, isAfter, isBefore, isEqual} from 'date-fns';
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { calendarDay, decimal, integer, relationship, text, timestamp, } from "@keystone-6/core/fields";
import { mailBookingCreated } from "../lib/mail";
import { User, Addon, Service, IDObj } from '../types'
import { dateCheckAvail } from '../lib/dateCheck';
import { DateTime } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { createGEvent } from '../lib/googleCalendar';

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
    durationInHours: decimal({
      defaultValue: '24',
      precision: 5,
      scale: 2,
      validation: {
        isRequired: true,
        max: '24',
        min: '.25',
      },
    }),
    service: relationship({ ref: 'Service.bookings', many: false }),
    addons: relationship({ ref: 'Addon.bookings', many: true }),
    price: integer({ defaultValue: 0 }),
    employees: relationship({ ref: 'User.gigs', many: true }),
    customer: relationship({ ref: 'User.bookings', many: false }),
    notes: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    dateCreated: timestamp({defaultValue: String(new Date().toISOString())}),
    dateModified: timestamp({defaultValue: String(new Date().toISOString())}),

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

        if(!resolvedData.service) return console.log('-------- no service selected')

        const selectedService = await context.db.Service.findOne({
          where: { id: resolvedData.service.connect.id  },
        })
        if(selectedService) {
          resolvedData.durationInHours = selectedService.durationInHours
          resolvedData.price = selectedService.price
        }

        const selectedAddons = await context.query.Addon.findMany({ 
          where: { id: { in: resolvedData.addons.connect.map((addon:Addon) => addon.id) }, },
          query: `
            price
          `
        })

        if(selectedAddons){
          selectedAddons.map(addon => {
            resolvedData.price += addon.price
          })
        }
        

        if(!resolvedData.employees) return console.log('-------- no employee selected')

        const bookedEmployees = await context.query.User.findMany({ 
          where: { id: { in: resolvedData.employees.connect.map((user:User) => user.id) }, },
          query: `
            id 
            name
            availability{
              id
              dateTime
              type
              status
              durationInHours
            }
            gigs {
              id
              dateTime
              durationInHours
            }
          `
        })
        
        // console.log('+*+*+*+*+*+*+*+*+*+*+*+*+*+*');
        bookedEmployees.map(emp => {
          // console.log('---------')
          // console.log(emp.name)

          if(dateCheckAvail(resolvedData.dateTime, resolvedData.durationInHours, emp.availability))
            console.log(`+++ Open Day no vaction set for ${emp.name}`)
           else 
            throw new Error(`CONFLICT: vacation day for ${emp.name}`)

          if(dateCheckAvail(resolvedData.dateTime, resolvedData.durationInHours, emp.gigs))
            console.log(`+++ No Gigs yet set for ${emp.name}`)
           else 
            throw new Error(`CONFLICT: double booking ${emp.name} `)
        })
        
      }

      if (operation === 'update') {
        // todo if service / addon was removed, or change, reflect the price.
        // console.log('%%%%%%%%%%%%%%%%% booking update')
        // console.log({resolvedData})
        // console.log({item})

        let currPrice:number = Number(item.price)
  
        if(resolvedData.service?.connect || resolvedData.service?.disconnect){
          
          if(item.serviceId){
            const prevService = await context.db.Service.findOne({
              //@ts-ignore
              where: { id: item.serviceId  },
            })          
            currPrice = Math.max(currPrice - Number(prevService?.price), 0) //don't go below zero
          }     

          if(resolvedData.service?.connect){
            const selectedService = await context.db.Service.findOne({
              //@ts-ignore
              where: { id: resolvedData.service.connect.id  },
            }) 
            currPrice = Math.max(currPrice + Number(selectedService?.price), 0) //don't go below zero
          }
        }

        if(resolvedData.addons?.connect || resolvedData.addons?.disconnect){

          if(resolvedData.addons?.disconnect){
            const disconnectedAddons = await context.query.Addon.findMany({ 
              where: { id: { in: resolvedData.addons.disconnect.map((addon:Addon) => addon.id) }, },
              query: `
                price
              `
            })

            const prices = disconnectedAddons.map(addon => addon.price)
            const priceTotal = prices.reduce((partialSum, a) => partialSum + a, 0);
            currPrice -= priceTotal
          }

          if(resolvedData.addons?.connect){
            const disconnectedAddons = await context.query.Addon.findMany({ 
              where: { id: { in: resolvedData.addons.connect.map((addon:Addon) => addon.id) }, },
              query: `
                price
              `
            })

            const prices = disconnectedAddons.map(addon => addon.price)
            const priceTotal = prices.reduce((partialSum, a) => partialSum + a, 0);
            currPrice += priceTotal
          }
        }

        resolvedData.price = currPrice
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
          mailBookingCreated(
            item.id,
            EMAIL_ADDRESS,
            customer.name,
            customer.email,
            item.notes,
          )
        }
        // console.log({ item });
        // console.log({ resolvedData });
        // todo email employees and customer too
        
        
        // createGEvent({
        //   summary: 'my summary',
        //   description: 'my desc',
        //   start: {
        //     dateTime: '2023-05-25T00:00:00',
        //     timeZone: 'chicago'
        //   },
        //   end: {
        //     dateTime: '2023-05-25T12:00:00',
        //     timeZone: 'chicago'
        //   },
        //   reminders: {
        //     useDefault: true,
        //     overrides: [
        //       {
        //         method: 'popup',
        //         minutes: 1,
        //       }
        //     ]
        //   },
        //   attendees: [
        //     { email: 'cutefruit88@gmail.com', comment: 'my comment'},
        //   ],
        //   sendUpdates: 'all',
        // })

      }

    },
  }
})