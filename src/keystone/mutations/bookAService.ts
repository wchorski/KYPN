// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from '@keystone-6/core';
// @ts-ignore
import { Context } from '.keystone/types';
// import { relationship } from '@keystone-6/core/fields';
import stripeConfig from '../../lib/stripe';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { GraphQLList } from 'graphql';
import { calcEndTime, dateCheckAvail, dateOverlapCount, dayOfWeek } from '../../lib/dateCheck';
import { Location, Service, Booking, User, Addon } from '../types'
import { createCalendarEvent } from '../../lib/googleapi/calCreate';

const IMG_PLACEHOLD = process.env.FRONTEND_URL + '/assets/product-placeholder.png'
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS || 'no_admin_email@m.lan'

export const bookAService = (base: BaseSchemaMeta) => graphql.field({
  type: base.object('Booking'),

  args: { 
    // bookingId: graphql.arg({ type: graphql.String }),
    serviceId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    locationId: graphql.arg({ type: graphql.String }),
    addonIds: graphql.arg({ type: graphql.list(graphql.String) }),
    employeeId: graphql.arg({ type: graphql.String }),
    start: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    customerName: graphql.arg({ type: graphql.String }),
    customerEmail: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    customerPhone: graphql.arg({ type: graphql.String }),
    notes: graphql.arg({ type: graphql.String }),
    amount_total: graphql.arg({ type: graphql.Int}),
  },


  async resolve(source, { 
    serviceId, 
    locationId,
    addonIds, 
    employeeId, 
    customerEmail, 
    customerName, 
    customerPhone, 
    notes,
    start,
    amount_total,
  }, context: Context) {

    // console.log({ 
    //   serviceId, 
    //   locationId,
    //   addonIds, 
    //   employeeId, 
    //   customerEmail, 
    //   customerName, 
    //   customerPhone, 
    //   notes,
    //   start,
    //   amount_total,
    // });
    


    const contextSudo = context.sudo()
    let description = ''
    
    // USER
    const userCount = await contextSudo.query.User.count({
      where: { email: { equals: customerEmail, } },
    }) as number

    const hasAccount = (userCount === 1) ? true : false
    
    // SERVICE 
    const service = await context.query.Service.findOne({
      where: { id: serviceId },
      query: `
        id
        name
        durationInHours
        price
        buisnessDays
      `
    })
    description += 'SERVICE: ' + service.name + ' \n'

    const end = calcEndTime(start, service.durationInHours)

    const day = new Date(start).getDay()
    if(!service.buisnessDays?.includes(day)) throw new Error(`CONFLICT: Service not allowed on ${dayOfWeek(day)}s`)

    // Location
    if(locationId){

      const selectedLocation = await contextSudo.query.Location.findOne({
        where: { id: locationId  },
        query: `
        name
        rooms
        bookings {
          start
          end
        }
        `
      }) as Location
      if(selectedLocation) {
        // console.log({selectedLocation})
        
        // check to see if this booking's start/end lands on any of the gig's start/end
        const gig = {
          start: start,
          end: end
        }
        const overlapCount = dateOverlapCount(gig, selectedLocation.bookings)      
        
        // check to see if # of bookings is more than # of rooms avail
        if(overlapCount > selectedLocation.rooms){
          throw new Error(`CONFLICT for Location ${selectedLocation.name}: All ${selectedLocation.rooms} rooms booked within this time range`)
        }
        
        description += 'LOCATION: ' + selectedLocation.name + ' \n'
      }
    }
      
    // Employee Availability
    if(employeeId){
      
      const bookedEmployees = await contextSudo.query.User.findMany({ 
        where: { id: { in: [employeeId] }, },
        query: `
        id 
        name
        email
        availability{
          id
          start
          end
          type
          status
          durationInHours
        }
        gigs {
          id
          start
          end
          durationInHours
        }
        `
      }) as User[]
        
        
      let employeeNames = ''
      bookedEmployees.map(emp => {
      console.log('---------')
      console.log(emp.name)

      if(dateCheckAvail(String(start), String(end), emp.availability))
        console.log(`+++ Open Day no vaction set for ${emp.name}`)
       else 
        throw new Error(`CONFLICT: vacation day for ${emp.name}`)

      if(dateCheckAvail(String(start), String(end), emp.gigs))
        console.log(`+++ No Gigs yet set for ${emp.name}`)
       else 
        throw new Error(`CONFLICT: double booking ${emp.name} `)

        employeeNames +=  emp.email + ', '
      })

      description += 'EMPLOYEES: ' + employeeNames + ' \n'
    }

    // ADDONS
    const pickedAddons = await context.query.Addon.findMany({
      where: {
        OR: addonIds?.map(id => ({id: { equals: id }} ))
      },
      query: `
        price
      `
    })
    
    // PRICING 
    // @ts-ignore
    const addonsCombinedPrice = pickedAddons.reduce((accumulator:number, currentValue:Addon) => accumulator + currentValue.price, 0);
    const priceTotal = service.price + addonsCombinedPrice

    // Calendar
    const calRes = await createCalendarEvent({
      summary: `${customerName || customerEmail} | ${service?.name}`,
      description: description,
      start: {
        dateTime: new Date(start || '').toISOString(),
        // timeZone: 'America/Chicago',
      },
      end: {
        dateTime: end,
        // timeZone: 'America/Chicago',
      },
    })
    
    // BOOKING
    const booking = await contextSudo.db.Booking.createOne({
      data: {
        summary: `${customerName || customerEmail} | ${service?.name}`,
        service: { connect: { id: serviceId } },
        location: (locationId) ? { connect: { id: locationId } } : null,
        employees: (employeeId) ? { connect: [{ id: employeeId }] } : null,
        addons: { connect: addonIds?.map(id => ({id: id}))},
        start: start,
        end: end,
        durationInHours: service.durationInHours,
        customer: (hasAccount) ? { connect: { email: customerEmail }} : null,
        name: customerName || '',
        email: customerEmail || '',
        phone: customerPhone || '',
        notes: notes || '',
        price: priceTotal,
        // @ts-ignore
        google: calRes,
      },
    })    
    

    // todo SEND EMAIL
    // mailCheckoutReceipt(
    //   order.id, 
    //   [user.email, ADMIN_EMAIL_ADDRESS],
    //   user.name,
    //   ADMIN_EMAIL_ADDRESS,
    //   ticketItems,
    //   now.toISOString(),
    //   totalOrder,
    // )

    return { 
      status: 'success', 
      message: 'book a service successful', 
      booking,
      id: booking.id,
    }
  }
})
