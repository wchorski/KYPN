// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-two-servers/keystone-server/src/seed/index.ts
// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-pages-directory/src/pages/index.tsx

import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { decimal, integer, json, relationship, text, timestamp, } from "@keystone-6/core/fields";
import { mailBookingCreated } from "../lib/mail";
import { User, Addon, Service, } from '../types'
import { dateCheckAvail } from '../lib/dateCheck';
import { createCalendarEvent } from "../lib/googleapi/calCreate";


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
      initialColumns: ['start', 'service', 'customer', 'employees'],
      initialSort: { field: 'start', direction: 'DESC'}
    },
  },


  fields: {
    // date: calendarDay({ validation: { isRequired: true } }),
    dateTime: timestamp({}),
    start: timestamp({ validation: { isRequired: true } }),
    end: timestamp({}),
    summary: text({validation: { isRequired: true }}),
    durationInHours: decimal({
      defaultValue: '23',
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
    google: json({
      defaultValue: { 
        id: '',
        status: '',
        kind: '',
        htmlLink: '',
      },
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

        let description = 'NOTES: ' + resolvedData.notes

        resolvedData.end = calcEndTime(resolvedData.start, resolvedData.durationInHours)

        if(resolvedData.service){
          const selectedService = await context.db.Service.findOne({
            where: { id: resolvedData.service.connect.id  },
          })
          if(selectedService) {
            resolvedData.durationInHours = selectedService.durationInHours
            resolvedData.price = selectedService.price
            resolvedData.end = calcEndTime(resolvedData.start, resolvedData.durationInHours)
            description += '\n SERVICE: ' + selectedService.name
          }
        }

        if(resolvedData.addons){
          const selectedAddons = await context.query.Addon.findMany({ 
            where: { id: { in: resolvedData.addons.connect.map((addon:Addon) => addon.id) }, },
            query: `
              price
              name
            `
          })
  
          if(selectedAddons){
            let addonNames = ''
            selectedAddons.map(addon => {
              resolvedData.price += addon.price
              addonNames +=  addon.name + ', '
            })
            description += '\n ADDONS: ' + addonNames
          }
        }
        

        if(resolvedData.employees){
          const bookedEmployees = await context.query.User.findMany({ 
            where: { id: { in: resolvedData.employees.connect.map((user:User) => user.id) }, },
            query: `
              id 
              name
              email
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
                start
                durationInHours
              }
            `
          })
          
          // console.log('+*+*+*+*+*+*+*+*+*+*+*+*+*+*');
          let employeeNames = ''
          bookedEmployees.map(emp => {
            // console.log('---------')
            // console.log(emp.name)
  
            if(dateCheckAvail(resolvedData.start, resolvedData.durationInHours, emp.availability))
              console.log(`+++ Open Day no vaction set for ${emp.name}`)
             else 
              throw new Error(`CONFLICT: vacation day for ${emp.name}`)
  
            if(dateCheckAvail(resolvedData.start, resolvedData.durationInHours, emp.gigs))
              console.log(`+++ No Gigs yet set for ${emp.name}`)
             else 
              throw new Error(`CONFLICT: double booking ${emp.name} `)

              employeeNames +=  emp.email + ', '
          })

          description += '\n EMPLOYEES: ' + employeeNames
        }
        
        const calRes = await createCalendarEvent({
          summary: resolvedData.summary,
          description: description,
          start: {
            dateTime: resolvedData.start,
            // timeZone: 'America/Chicago',
          },
          end: {
            dateTime: resolvedData.end,
            // timeZone: 'America/Chicago',
          },
        })
        // console.log({calRes})
  
        resolvedData.google = calRes
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
        // todo email employees and customer too. right now it just emails cutefruit@tawtaw.com
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
        console.log({item});
        
        // console.log({ item });
        // console.log({ resolvedData });
        // const calRes = await createCalendarEvent({
        //   summary: item.summary,
        //   description: item.notes,
        //   start: {
        //     dateTime: item.start,
        //     // timeZone: 'America/Chicago',
        //   },
        //   end: {
        //     dateTime: item.end,
        //     // timeZone: 'America/Chicago',
        //   },
        // })
        // console.log({calRes})

        // item.google = calRes
  
      }

    },
  }
})


function calcEndTime(start:string, duration:string){
  const date = new Date(start);
  date.setTime(date.getTime() + Number(duration) * 60 * 60 * 1000);
  return date.toISOString();

}