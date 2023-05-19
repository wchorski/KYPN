// docs - https://keystonejs.com/docs/guides/schema-extension
import { graphql } from '@keystone-6/core';
import { Context } from '.keystone/types';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';


export const contact = (base: BaseSchemaMeta) => graphql.field({

  type: base.object('Booking'),
  args: { 
    name: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    email: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    phone: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    notes: graphql.arg({ type: graphql.nonNull(graphql.String) }),
  },

  resolve(source, { name, email, phone, notes }, context:Context) {

    const concatNotes = `[- name: ${name} \n- email: ${email} \n- phone: ${phone}] \n -- \n ${notes}`
    const summary = `[LEAD] ${name ? name : email ? email : phone ? phone : 'no_info'}`

    const now = new Date().toISOString()
    return context.db.Booking.createOne({
      data: { summary: `${summary}`, start: now, notes: concatNotes, status: 'LEAD'},
    })
  }
})