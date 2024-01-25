// docs - https://keystonejs.com/docs/guides/schema-extension
import { graphql } from '@keystone-6/core';
import { Context } from '.keystone/types';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { mailBooking } from '../../lib/mail';
import { envs } from '../../../envs';
// @ts-ignore
import jwt from 'jsonwebtoken'
import { datePrettyLocal } from '../../lib/dateFormatter';

type Payload = {
  id:string,
  email:string,
  iat:number,
  exp: number
}

export const verifyEmail = (base: BaseSchemaMeta) => graphql.field({

  type: base.object('User'),

  args: { 
    token: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    email: graphql.arg({ type: graphql.nonNull(graphql.String) }),
  },

  async resolve(source, { email, token }, context:Context) {

    const { query } = context.sudo();

    try {
      const foundUser = await query.User.findOne({
        where: { email },
        query: `
          id
          role{
            name
          }
        `
      })
      if(!foundUser) throw new Error('!!! no user found')
      
      if(foundUser.role?.name) throw new Error('!!! user already registered: ' + JSON.stringify(foundUser.role, null, 2))

      const secret = envs.NEXTAUTH_SECRET + foundUser.id

      // verify token
      const payload = await jwt.verify(token, secret) as Payload 
      
      const user = await query.User.updateOne({
        where: { email },
        data: {
          role: { connect: { name: envs.BASIC_USER_ROLE_NAME } },
          // @ts-ignore
          isVerified: true,
        }
      })

      return user
      
      
    } catch (error:any) {
      throw new Error(error)
    }

    

  }
})