// docs - https://keystonejs.com/docs/guides/schema-extension
import { graphql } from '@keystone-6/core';
import { Context } from '.keystone/types';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { mailContact } from '../../lib/mail';
import { envs } from '../../../envs';


export const contact = (base: BaseSchemaMeta) => graphql.field({

  type: base.object('User'),
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
    // const summary = `${name ? name : email ? email : phone ? phone : 'no_info'}`

    const now = new Date().toISOString()

    const { query } = context.sudo();

    // todo mail moved to booking afterOpt
    const user = await query.User.findOne({
      where: { id: customerId },
      query: `
        id
        name
      `
    })

    mailContact({
      to: [envs.ADMIN_EMAIL_ADDRESS],
      contact: {
        customerId: user?.id, 
        name, 
        email, 
        phone, 
        start,
        notes,
      }

    }).catch(error => {
      console.log('!!! contact email failed')
      return {error, ok:false}
    })
    
    // return user
    return {
      id: 'contact delivered to admin email',
    }

  }
})