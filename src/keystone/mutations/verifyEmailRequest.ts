// docs - https://keystonejs.com/docs/guides/schema-extension
import { graphql } from '@keystone-6/core';
import type { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';

import { mailVerifyUser } from '../../lib/mail';
// @ts-ignore
import { tokenEmailVerify } from '../../lib/tokenEmailVerify';
import type { User } from '../types';
import type { Context } from '.keystone/types';

type Payload = {
  id:string,
  email:string,
  iat:number,
  exp: number
}

export const verifyEmailRequest = (base: BaseSchemaMeta) => graphql.field({

  type: base.object('User'),

  args: { 
    email: graphql.arg({ type: graphql.nonNull(graphql.String) }),
  },

  async resolve(source, { email }, context:Context) {

    const { graphql: sudoGQL } = context.sudo();

    try {
      const data = (await sudoGQL.run({
				query: `
          query Users($where: UserWhereInput!) {
            users(where: $where) {
              id
              email
              name
              role{
                name
              }
            }
          }
        `,
				variables: {
					where: {
						email: {
							equals: email,
							mode: "insensitive",
						},
					},
				},
			})) as { users: User[]  }
      const foundUser = data.users[0]

      // const foundUser = await query.User.findOne({
      //   where: { email },
      //   query: `
      //     id
      //     email
      //     name
      //     role{
      //       name
      //     }
      //   `
      // })
      
      if(!foundUser) throw new Error('!!! no user found')
      
      if(foundUser.role?.name) throw new Error('!!! user already is of role: ' + JSON.stringify(foundUser.role.label, null, 2))

      // verify token
      const token = await tokenEmailVerify({email: foundUser.email, id: foundUser.id})

      const mail = await mailVerifyUser({
        to: [foundUser.email, ],
        token,
        user: {
          email: foundUser.email,
          name: foundUser.name,
          id: foundUser.id,
        },
      })

      return {status: 'success', message: 'email verification sent out to email'}
      
      
    } catch (error:any) {

      throw new Error(error)
    }

    

  }
})