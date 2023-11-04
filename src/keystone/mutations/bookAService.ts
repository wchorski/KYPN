// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from '@keystone-6/core';
// @ts-ignore
import { Context } from '.keystone/types';
// import { relationship } from '@keystone-6/core/fields';
import stripeConfig from '../../lib/stripe';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { GraphQLList } from 'graphql';
import { calcEndTime } from '../../lib/dateCheck';

const IMG_PLACEHOLD = process.env.FRONTEND_URL + '/assets/product-placeholder.png'
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS || 'no_admin_email@m.lan'

export const bookAService = (base: BaseSchemaMeta) => graphql.field({
  type: base.object('Booking'),

  args: { 
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

    console.log('%%%%% bookAService %%%');
    
    console.log(serviceId);
    console.log(locationId);
    console.log(addonIds);
    console.log(customerEmail);
    console.log(start);
    
    // // USER
    // const user = await context.query.User.findOne({
    //   where: { email: customerEmail },
    //   query:`
    //     id
    //     name
    //     email
    //     phone
    //   `
    // })
    
    // SERVICE 
    const service = await context.query.Service.findOne({
      where: { id: serviceId },
      query: `
        id
        name
        durationInHours
      `
    })
    console.log({service});
    
    // if(selectedService) {
    //   selectedService.durationInHours = selectedService.durationInHours
    //   resolvedData.end = calcEndTime(String(resolvedData.start), String(resolvedData.durationInHours))
    //   description += 'SERVICE: ' + selectedService.name + ' \n\n'

    //   const day = new Date(resolvedData.start || '').getDay()
    //   // console.log({day})
    //   // @ts-ignore
    //   if(!selectedService.buisnessDays?.includes(day)) throw new Error(`CONFLICT: Service not allowed on ${dayOfWeek(day)}s`)
    // }

    // // ADDONS


    // // PRICING 
    
    // BOOKING
    const booking = await context.sudo().db.Booking.createOne({
      data: {
        summary: `${customerName || customerEmail} | ${service?.name}`,
        service: { connect: { id: serviceId } },
        location: (locationId) ? { connect: { id: locationId } } : null,
        // employees: (employeeId) ? { connect: [{ id: employeeId }] } : null,
        start: start,
        end: calcEndTime(start, service.durationInHours),
        durationInHours: service.durationInHours,
        // TODO anonymous customers can't query Users
        customer: { connect: { email: customerEmail }},
        name: customerName || '',
        email: customerEmail || '',
        phone: customerPhone || '',
        notes: notes || '',
      },
    })
    console.log('+++ BOOOKING CREATED +++');
    console.log({booking});
    
    

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
