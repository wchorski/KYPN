// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-two-servers/keystone-server/src/seed/index.ts
// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-pages-directory/src/pages/index.tsx

import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { decimal, integer, json, relationship, select, text, timestamp, } from "@keystone-6/core/fields";
import { mailBookingCreated } from "../../lib/mail";
import { User, Addon, Service, Location, } from '../types'
import { calcEndTime, dateCheckAvail, dateOverlapCount, dayOfWeek } from '../../lib/dateCheck';
import { createCalendarEvent, deleteCalendarEvent, updateCalendarEvent } from "../../lib/googleapi/calCreate";
import { datePrettyLocal } from "../../lib/dateFormatter";
import { isLoggedIn, permissions, rules } from "../access";


const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // add 1 because getMonth() returns zero-based index
const day = now.getDate();
const today = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
// console.log(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
const EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS || 'no_email_set'
const FRONTEND_URL = process.env.FRONTEND_URL || 'no_frontend_url'
// const EMAIL_ADDRESS = 'y@m'

// const rightnow = new Date().toISOString()

export const Booking:Lists.Booking = list({

  access: {
    filter: {
      query: () => true,
      update: rules.canManageBookings,
      delete: rules.canManageBookings,
    },
    operation: {
      create: () => true,
      query: () => true,
      update: isLoggedIn,
      delete: isLoggedIn,
    }
  },

  ui: {
    // hide backend from non admins
    listView: {
      initialColumns: ['start', 'end', 'summary', 'service', 'customer', 'employees'],
      initialSort: { field: 'start', direction: 'DESC'}
    },
  },


  fields: {
    start: timestamp({ validation: { isRequired: true } }),
    end: timestamp({}),
    summary: text({validation: { isRequired: true }, defaultValue: '[NEW BOOKING]'}),
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
    location: relationship({ ref: 'Location.bookings', many: false }),
    addons: relationship({ ref: 'Addon.bookings', many: true }),
    price: integer({ defaultValue: 0, validation: { isRequired: true } }),
    employees: relationship({ ref: 'User.gigs', many: true }),
    customer: relationship({ ref: 'User.bookings', many: false }),
    email: text(),
    phone: text(),
    name: text(),
    notes: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    status: select({
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Postponed', value: 'POSTPONED' },
        { label: 'Canceled', value: 'CANCELED' },
        { label: 'Lead', value: 'LEAD' },
      ],
      defaultValue: 'LEAD',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
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

      if (operation === 'create') {

        // let description:string = ''

        // description += 'CLIENT: ' + resolvedData?.name + ' | <' + resolvedData?.email + '>' + ' | ' + resolvedData?.phone + '\n'
        // description += 'STATUS: ' + resolvedData.status + ' \n'

        // resolvedData.end = calcEndTime(String(resolvedData.start), String(resolvedData.durationInHours))

        // if(resolvedData.service){
        //   const selectedService= await context.db.Service.findOne({
        //     where: { id: resolvedData.service.connect?.id  },
        //   }) 
        //   if(selectedService) {
        //     resolvedData.durationInHours = selectedService.durationInHours
        //     resolvedData.price = selectedService.price
        //     resolvedData.end = calcEndTime(String(resolvedData.start), String(resolvedData.durationInHours))
        //     description += 'SERVICE: ' + selectedService.name + ' \n\n'

        //     const day = new Date(resolvedData.start || '').getDay()
        //     // console.log({day})
        //     // @ts-ignore
        //     if(!selectedService.buisnessDays?.includes(day)) throw new Error(`CONFLICT: Service not allowed on ${dayOfWeek(day)}s`)
        //   }
        // }

        // if(resolvedData.location){
        //   const selectedLocation = await context.query.Location.findOne({
        //     where: { id: resolvedData.location.connect?.id  },
        //     query: `
        //       name
        //       rooms
        //       bookings {
        //         start
        //         end
        //       }
        //     `
        //   }) as Location
        //   if(selectedLocation) {
        //     // console.log({selectedLocation})

        //     // check to see if this booking's start/end lands on any of the gig's start/end
        //     const gig = {
        //       start: String(resolvedData.start),
        //       end: resolvedData.end
        //     }
        //     const overlapCount = dateOverlapCount(gig, selectedLocation.bookings)
            
        //     // check to see if # of bookings is more than # of rooms avail
        //     if(overlapCount > selectedLocation.rooms){
        //       throw new Error(`CONFLICT for Location ${selectedLocation.name}: All rooms booked within this time range`)
        //     }
            
        //   }
        // }

        // if(resolvedData.addons){
        //   const selectedAddons = await context.query.Addon.findMany({ 
        //     // @ts-ignore //todo might cause problems
        //     where: { id: { in: resolvedData.addons.connect.map((addon:Addon) => addon.id) }, },
        //     query: `
        //       price
        //       name
        //     `
        //   }) as Addon[]
  
        //   if(selectedAddons){
        //     let addonNames = ''
        //     selectedAddons.map(addon => {
        //       // @ts-ignore //todo might cause problems
        //       resolvedData.price += addon.price
        //       addonNames +=  '- ' + addon.name + '\n '
        //     })
        //     description += 'ADDONS: \n' + addonNames + ' \n\n'
        //   }
        // }
        

        // if(resolvedData.employees){
        //   const bookedEmployees = await context.query.User.findMany({ 
        //     // @ts-ignore //todo might cause problems
        //     where: { id: { in: resolvedData.employees.connect.map((user:User) => user.id) }, },
        //     query: `
        //       id 
        //       name
        //       email
        //       availability{
        //         id
        //         start
        //         end
        //         type
        //         status
        //         durationInHours
        //       }
        //       gigs {
        //         id
        //         start
        //         end
        //         durationInHours
        //       }
        //     `
        //   }) as User[]
          
          
        //   // console.log('+*+*+*+*+*+*+*+*+*+*+*+*+*+*');
        //   let employeeNames = ''
        //   bookedEmployees.map(emp => {
        //     // console.log('---------')
        //     // console.log(emp.name)
  
        //     if(dateCheckAvail(String(resolvedData.start), String(resolvedData.end), emp.availability))
        //       console.log(`+++ Open Day no vaction set for ${emp.name}`)
        //      else 
        //       throw new Error(`CONFLICT: vacation day for ${emp.name}`)
  
        //     if(dateCheckAvail(String(resolvedData.start), String(resolvedData.end), emp.gigs))
        //       console.log(`+++ No Gigs yet set for ${emp.name}`)
        //      else 
        //       throw new Error(`CONFLICT: double booking ${emp.name} `)

        //       employeeNames +=  emp.email + ', '
        //   })

        //   description += 'EMPLOYEES: ' + employeeNames + ' \n'
        // }
        // // console.log({resolvedData});

        // description += 'NOTES: \n' + resolvedData.notes
        // description += 'URL: '     + 'before resolve'
        
        // // todo refactor to the 'afterOperation' - but don't forget employee conflict
        // const calRes = await createCalendarEvent({
        //   summary: resolvedData.summary || '',
        //   description: description,
        //   start: {
        //     dateTime: new Date(resolvedData.start || '').toISOString(),
        //     // timeZone: 'America/Chicago',
        //   },
        //   end: {
        //     dateTime: resolvedData.end,
        //     // timeZone: 'America/Chicago',
        //   },
        // })

        // console.log('%%%%%% HELP ME after cal %%%%%%%');
        
        // // console.log({calRes})
        // // @ts-ignore //todo might cause problems
        // resolvedData.google = calRes
      }



      if (operation === 'update') {
        // TODO still check for availablility of employee here

        // let currPrice:number = Number(item.price)
  
        // if(resolvedData.service?.connect || resolvedData.service?.disconnect){
          
        //   if(item.serviceId){
        //     const prevService = await context.db.Service.findOne({
        //       //@ts-ignore
        //       where: { id: item.serviceId  },
        //     })          
        //     currPrice = Math.max(currPrice - Number(prevService?.price), 0) //don't go below zero
        //   }     

        //   if(resolvedData.service?.connect){
        //     const selectedService = await context.db.Service.findOne({
        //       //@ts-ignore
        //       where: { id: resolvedData.service.connect.id  },
        //     }) 
        //     currPrice = Math.max(currPrice + Number(selectedService?.price), 0) //don't go below zero
        //   }
        // }
        

        // if(resolvedData.addons?.connect || resolvedData.addons?.disconnect){

        //   if(resolvedData.addons?.disconnect){
        //     const disconnectedAddons = await context.query.Addon.findMany({ 
        //       // @ts-ignore //todo might cause problems
        //       where: { id: { in: resolvedData.addons.disconnect.map((addon:Addon) => addon.id) }, },
        //       query: `
        //         price
        //       `
        //     })

        //     const prices = disconnectedAddons.map(addon => addon.price)
        //     const priceTotal = prices.reduce((partialSum, a) => partialSum + a, 0);
        //     currPrice -= priceTotal
        //   }

        //   if(resolvedData.addons?.connect){
        //     const disconnectedAddons = await context.query.Addon.findMany({ 
        //       // @ts-ignore //todo might cause problems
        //       where: { id: { in: resolvedData.addons.connect.map((addon:Addon) => addon.id) }, },
        //       query: `
        //         price
        //       `
        //     })

        //     const prices = disconnectedAddons.map(addon => addon.price)
        //     const priceTotal = prices.reduce((partialSum, a) => partialSum + a, 0);
        //     currPrice += priceTotal
        //   }
        // }

        // resolvedData.price = currPrice
        // resolvedData.dateModified = new Date().toISOString()
        
      }

      if(operation === 'delete'){
        // console.log({item});
        
        // @ts-ignore
        if(!item.google.id) return console.log('no google cal id');
        // @ts-ignore
        // console.log('GOOOGLE CAL ID:::: ', item.google.id);
        // @ts-ignore
        const calResponse = await deleteCalendarEvent(item.google.id)
      }

    },
    afterOperation: async ({ operation, resolvedData, item, context }) => {
      if (operation === 'create') {
        // let customer = {
        //   id: 'non registered user',
        //   name: 'non registered user',
        //   email: 'non registered user',
        //   phone: 'non registered user',
        // }
        // console.log('===========');
        
        // console.log(resolvedData.employees?.connect);
        // // @ts-ignore
        // const employeesIds = resolvedData.employees?.connect.flatMap(emp => emp.id)
        // const employeesObjs = await context.db.User.findMany({ where: { id: {in: employeesIds.map((userId:string) => userId)} } })
        // const employeesEmails = employeesObjs.flatMap(emp => emp.email) as string[]

        // const serviceObj = await context.db.Service.findOne({ where: { id: item.serviceId as string } })
        
        
        // // todo email employees and customer too. right now it just emails admin_email
        // if (item?.customerId) {
        //   // @ts-ignore //todo might cause problems
        //   customer = await context.db.User.findOne({ where: { id: item?.customerId } })
        //   mailBookingCreated(
        //     item.id as string,
        //     [EMAIL_ADDRESS, item?.email as string, ...employeesEmails],
        //     {
        //       id: customer.id,
        //       name: customer.name,
        //       email: customer.email,
        //       phone: customer.phone,
        //     },
        //     {
        //       id: employeesObjs[0].id as string,
        //       name: employeesObjs[0].name as string,
        //     },
        //     customer.name,
        //     customer.email,
        //     {
        //       email: item?.email as string,
        //       name: item?.name as string,
        //       phone: item?.phone as string,
        //       // @ts-ignore
        //       start: datePrettyLocal(item?.start.toISOString() , 'full'),
        //       service: {
        //         id: serviceObj?.id as string,
        //         name: serviceObj?.name as string,
        //       }
        //     },
        //     item.notes as string,
        //   )
        // } else if(item){
        //   mailBookingCreated(
        //     item.id as string,
        //     // @ts-ignore
        //     [EMAIL_ADDRESS, item?.email, ...employeesEmails],
        //     {
        //       id: customer.id,
        //       name: customer.name,
        //       email: customer.email,
        //       phone: customer.phone,
        //     },
        //     {
        //       id: employeesObjs[0].id,
        //       name: employeesObjs[0].name,
        //     },
        //     customer.name,
        //     customer.email,
        //     {
        //       email: item?.email,
        //       name: item?.name,
        //       phone: item?.phone,
        //       // @ts-ignore
        //       start: datePrettyLocal(item?.start.toISOString(), 'full'),
        //       service: {
        //         id: serviceObj?.id || '',
        //         name: serviceObj?.name || '',
        //       }
        //     },
        //     item.notes,
        //   )
        // }

        // const calResponse = await handleCalendarEvent(item, context)
  
      }

      if(operation === 'update'){

        // TODO calendar integrations
        // const calResponse = await handleCalendarEvent(item, context)
        // resolvedData.google = calResponse
      }

    },
  }
})


async function handleCalendarEvent(item:any, context:any) {
  // console.log('+++++++++ after booking update');

  const selectedBooking = await context.query.Booking.findOne({
    where: { id: item.id  },
    query: `
      summary
      start
      end
      notes
      status
      name
      email
      phone
      service {
        name
      }
      employees{
        name
        email
      }
      addons {
        name
      }
    `
  }) 

  // console.log({selectedBooking});
  
  let calDescription = '' 

  console.log({selectedBooking});
  

  calDescription += 'CLIENT: '      + selectedBooking.name + ' | ' + selectedBooking?.email + ' | ' + selectedBooking?.phone + '\n'
  calDescription += 'STATUS: '      + selectedBooking.status + ' \n'
  calDescription += 'SERVICE: '     + selectedBooking.service.name + ' \n' 
  calDescription += 'ADDONS: \n'    + selectedBooking?.addons?.map((addon:Addon) => '  - ' + addon.name).join(', \n') + ' \n' 
  calDescription += 'EMPLOYEES: \n' + selectedBooking?.employees?.map((emp:User) => '  - ' + emp.email).join(', \n') + ' \n\n' 
  calDescription += 'NOTES: '       + selectedBooking.notes + '\n'
  calDescription += 'URL: '         + FRONTEND_URL + `/bookings/${item.id}`

  const calSummary = selectedBooking.name + ' | ' + selectedBooking.service.name
  const calRes = await updateCalendarEvent(
    item.google.id,
    {
      summary: calSummary,
      description: calDescription,
      start: {
        dateTime: selectedBooking.start,
        // timeZone: 'America/Chicago',
      },
      end: {
        dateTime: selectedBooking.end,
        // timeZone: 'America/Chicago',
      },
    }
  )
  // console.log({calRes})
  // @ts-ignore //todo might cause problems

  return calRes
  // resolvedData.google = calRes
}