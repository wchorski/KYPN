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

const now  = new Date().toISOString()

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
      
      // todo querying all 'gigs' for an employee could be expensive down the line. how to filter gigs that 'end' after NOW?
      // maybe query gigs seperately?

      // todo just run a graphql query?
      const employeesThatHaveCurrentGigs = await contextSudo.graphql.run({
        query: `
          query Query($where: UserWhereInput!, $gigsWhere: BookingWhereInput!, $availWhere: AvailabilityWhereInput!) {
            users(where: $where) {
              id 
              name
              email
              availability(where: $availWhere) {
                id
                start
                end
                type
                status
                durationInHours
              }
              gigs(where: $gigsWhere) {
                id
                start
                end
                durationInHours
              }
            }
          }
        `,
        variables: {
          where: {
            id: {
              in: [employeeId]
            }
          },
          gigsWhere: {
            end: {
              gt: now
            },
            status: {
              in: [
                "CONFIRMED",
                "DOWNPAYMENT",
                "HOLD"
              ]
            },
          },
          availWhere: {
            end: {
              gt: now
            },
          }
        }
      }) as {users:User[]}

      
      const bookedEmployees = employeesThatHaveCurrentGigs.users        
        
      let employeeNames = ''
      bookedEmployees.map(emp => {

      if(dateCheckAvail(String(start), String(end), emp.availability))
        // console.log(`+++ Open Day no vaction set for ${emp.name}`)
        console.log('');
       else 
        throw new Error(`CONFLICT: vacation day for ${emp.name}`)

      if(dateCheckAvail(String(start), String(end), emp.gigs))
        // console.log(`+++ No Gigs yet set for ${emp.name}`)
        console.log('');
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

    // todo moved to Booking.ts afterOpt hook
    // // Calendar
    // const calRes = await createCalendarEvent({
    //   summary: `${customerName || customerEmail} | ${service?.name}`,
    //   description: description,
    //   start: {
    //     dateTime: new Date(start || '').toISOString(),
    //     // timeZone: 'America/Chicago',
    //   },
    //   end: {
    //     dateTime: end,
    //     // timeZone: 'America/Chicago',
    //   },
    // })        
    
    // BOOKING
    const booking = await contextSudo.db.Booking.createOne({
      data: {
        // summary: `${customerName || customerEmail} | ${service?.name}`,
        service: { connect: { id: serviceId } },
        location: (locationId) ? { connect: { id: locationId } } : null,
        // employees: (employeeId) ? { connect: [{ id: employeeId }] } : null,
        employee_requests: (employeeId) ? { connect: [{ id: employeeId }] } : null,
        addons: addonIds ? { connect: addonIds?.map(id => ({id: id}))} : null,
        start: start,
        end: end,
        //? virtual field now
        // durationInHours: service.durationInHours,
        customer: (hasAccount) ? { connect: { email: customerEmail }} : null,
        name: customerName || '',
        email: customerEmail || '',
        phone: customerPhone || '',
        notes: notes || '',
        price: priceTotal,
        status: (serviceId && employeeId) ? 'HOLD' : 'LEAD',
        details: [],
        // google: calRes,
      },
    })    
    

    // email sent via Schema file

    return { 
      status: 'success', 
      message: 'book a service successful', 
      booking,
      id: booking.id,
    }
  }
})
