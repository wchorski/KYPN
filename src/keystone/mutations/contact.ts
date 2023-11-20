// docs - https://keystonejs.com/docs/guides/schema-extension
import { graphql } from '@keystone-6/core';
import { Context } from '.keystone/types';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { mailBooking } from '../../lib/mail';
import { envs } from '../../../envs';
import { Booking } from '../types';
import { datePrettyLocal } from '../../lib/dateFormatter';


export const contact = (base: BaseSchemaMeta) => graphql.field({

  type: base.object('Booking'),
  args: { 
    name: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    customerId: graphql.arg({ type: graphql.String }),
    email: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    phone: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    start: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    notes: graphql.arg({ type: graphql.nonNull(graphql.String) }),
  },

  async resolve(source, { name, email, phone, notes, start, customerId }, context:Context) {

    // const concatNotes = `- name: ${name} \n- email: ${email} \n- phone: ${phone} \n --- \n ${notes}`
    const summary = `${name ? name : email ? email : phone ? phone : 'no_info'}`

    const now = new Date().toISOString()

    const { db } = context.sudo();
    const booking = await db.Booking.createOne({
      data: { 
        summary: `${summary}`, 
        start, 
        status: 'LEAD',
        email,
        phone,
        name,
        notes, 
        customer: (customerId) ? { connect: { id: customerId }} : null,
      },
    }) 

    const user = await db.User.findOne({
      where: { id: customerId },
    })

    // mailBooking({
    //   id: booking.id,
    //   to: [envs.ADMIN_EMAIL_ADDRESS, email],
    //   customer: { 
    //     id: customerId, 
    //     name: user?.name, 
    //     email: user?.email, 
    //     phone: user?.phone, 
    //   },
    //   booking: {
    //     name,
    //     email,
    //     phone,
    //     start: datePrettyLocal(start, 'full'),
    //     notes,
    //   },

    // })
  
  
    return booking
  }
})