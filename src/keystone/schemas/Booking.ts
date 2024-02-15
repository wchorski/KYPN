// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-two-servers/keystone-server/src/seed/index.ts
// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-pages-directory/src/pages/index.tsx

import { graphql, list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { decimal, integer, json, relationship, select, text, timestamp, virtual, } from "@keystone-6/core/fields";
import { mailBooking } from "../../lib/mail";
import { User, Addon, Service, Location, } from '../types'
import { calcEndTime, dateCheckAvail, dateOverlapCount, dayOfWeek } from '../../lib/dateCheck';
import { createCalendarEvent, deleteCalendarEvent, updateCalendarEvent } from "../../lib/googleapi/calCreate";
import { datePrettyLocal } from "../../lib/dateFormatter";
import { isLoggedIn, permissions, rules } from "../access";
import { envs } from "../../../envs";


const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // add 1 because getMonth() returns zero-based index
const day = now.getDate();
const today = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
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
      initialColumns: ['start', 'end', 'name', 'email', 'status', 'service', 'customer', 'employees'],
      initialSort: { field: 'start', direction: 'DESC'}
    },
  },


  fields: {
    start: timestamp({ validation: { isRequired: true } }),
    end: timestamp({
      hooks: {
        beforeOperation({resolvedData}) {
          // todo could also calc dervice duration right here for end time
          if(!resolvedData) return

          if(!resolvedData.end){
            resolvedData.end = resolvedData?.start
          } 
        },
      }
    }),
    
    // summary: text({validation: { isRequired: true }, defaultValue: '[NEW BOOKING]'}),
    summary: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item:any, args, context) {
          // if(!item.serviceId) return item.name
          const service = await context.query.Service.findOne({
            where: {id: item.serviceId || 'null' },
            query: `
              name
            `
          }) as Service
          return item?.name || 'Anonymous' + ' | ' + service?.name || 'No Service Selected';
        },
      })
    }),
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
    secretNotes: text({
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
        { label: 'Paid', value: 'PAID' },
        { label: 'Down Payment', value: 'DOWNPAYMENT' },
        { label: 'Hold', value: 'HOLD' },
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

      // if (operation === 'create') {

      // }

      if (operation === 'update') {

        // let newSummary = (resolvedData.name || item.name) + ' | '
        // if(resolvedData.service) newSummary + resolvedData.service
        // // resolvedData.summary = (resolvedData.name || item.name) + ' | '
        
      }

      if(operation === 'delete'){

        const employees = await context.sudo().query.User.findMany({
          where: {
            gigs: {
              some: {
                id: {
                  equals: item.id
                }
              }
            }
          },
          query: `
            id
            email
          `
        }) as User[]

        const employeeEmails = employees.flatMap( emp => emp.email)

        const mail = await mailBooking({
          to: [envs.ADMIN_EMAIL_ADDRESS, item?.email || '', ...employeeEmails],
          operation,
          // @ts-ignore
          booking: item,
        })
        
        

        // @ts-ignore
        if(!item?.google?.id) return console.log('!!! no google cal id');
        // @ts-ignore
        const calResponse = await deleteCalendarEvent(item.google.id)
      }


    },
    afterOperation: async ({ operation, resolvedData, item, context }) => {

      if (operation === 'create') {
        const { calSummary, calDescription, calStart, calEnd } = await handleCalendarDetails(item, context)
        
        // Calendar
        const calRes = await createCalendarEvent({
          summary: calSummary,
          description: calDescription,
          start: {
            dateTime: calStart,
            // timeZone: 'America/Chicago',
          },
          end: {
            dateTime: calEnd,
            // timeZone: 'America/Chicago',
          },
        })
        if(!calRes) return
        console.log('### booking afteropt create calRes, ', calRes);
        const updateBooking = await context.sudo().query.Booking.updateOne({
          where: { id: item.id},
          data: {
            secretNotes: '### SUPER SECRET NOTE DEFAULT',
            //@ts-ignore
            google: calRes
          }
        })
        // resolvedData.secretNotes = '### SUPER SECRET NOTE DEFAULT'
        // if(!calRes) return
        // resolvedData.google = calRes
      }

      if(operation === 'create' || operation === 'update'){

        // todo does not checking this cause problems down the line?
        // if(!item.serviceId) throw new Error('!!! Booking: no service selected')
        
        const service = await context.sudo().query.Service.findOne({
          where: { id: item?.serviceId || 'null' },
          query: `
            id
            name
          `
        }) as Service|undefined
        
        const employees = await context.sudo().query.User.findMany({
          where: {
            gigs: {
              some: {
                id: {
                  equals: item.id
                }
              }
            }
          },
          query: `
            id
            email
          `
        }) as User[]

        const employeeEmails = employees.flatMap( emp => emp.email)

        const mail = await mailBooking({
          to: [envs.ADMIN_EMAIL_ADDRESS, item?.email || '', ...employeeEmails],
          operation,
          // @ts-ignore
          booking: {
            ...item,
            service,
          },
        })

        
      }

      if(operation === 'update'){
        // @ts-ignore
        if(!item?.google?.id) return
        const calResponse = await handleCalendarUpdate(item, context)
        
        if(!calResponse) return
        resolvedData.google = calResponse
        console.log("## booking afteropt resolvedData: ", resolvedData);
        
      }

    },
  }
})

async function handleCalendarUpdate(item:any, context:any) {

  const { calDescription, calSummary, calStart, calEnd} = await handleCalendarDetails(item, context)
  
  const calRes = await updateCalendarEvent(
    item.google.id,
    {
      summary: calSummary,
      description: calDescription,
      start: {
        dateTime: calStart,
        // timeZone: 'America/Chicago',
      },
      end: {
        dateTime: calEnd,
        // timeZone: 'America/Chicago',
      },
    }
  )

  return calRes
}

async function handleCalendarDetails(item:any, context:any){
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
        durationInHours
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
  
  let calDescription = '' 
  

  calDescription += 'CLIENT: '      + selectedBooking?.name + ' | ' + selectedBooking?.email + ' | ' + selectedBooking?.phone + '\n'
  calDescription += 'STATUS: '      + selectedBooking.status + ' \n'
  calDescription += 'SERVICE: '     + selectedBooking.service?.name || 'No Service Selected' + ' \n' 
  calDescription += 'ADDONS: \n'    + selectedBooking?.addons?.map((addon:Addon) => '  - ' + addon.name).join(', \n') + ' \n' 
  calDescription += 'EMPLOYEES: \n' + selectedBooking?.employees?.map((emp:User) => '  - ' + emp.email).join(', \n') + ' \n\n' 
  calDescription += 'NOTES: '       + selectedBooking.notes + '\n'
  calDescription += 'URL: '         + FRONTEND_URL + `/bookings/${item.id}`

  const calSummary = selectedBooking.name || 'anonymous' + ' | ' + selectedBooking.service?.name || 'No Service Selected'

  const calcEnd = calcEndTime(selectedBooking.start, selectedBooking.service?.durationInHours)
  return {
    calSummary,
    calDescription,
    calStart: selectedBooking.start,
    calEnd: selectedBooking.end || calcEnd,
  }
}
