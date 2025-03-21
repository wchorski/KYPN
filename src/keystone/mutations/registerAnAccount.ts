// docs - https://keystonejs.com/docs/guides/schema-extension
import { graphql } from "@keystone-6/core"
import type { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"

import { envs } from "../../../envs"
import { emailRegex, passwordRegExp } from "../../lib/regexPatterns"
import type { Context } from ".keystone/types"

export const registerAnAccount = (base: BaseSchemaMeta) =>
	graphql.field({
		type: base.object("User"),
		args: {
			name: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			email: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			password: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			passwordConfirm: graphql.arg({ type: graphql.nonNull(graphql.String) }),
		},

		async resolve(source, variables, context: Context) {
			const { name, email, password, passwordConfirm } = variables
			// const concatNotes = `- name: ${name} \n- email: ${email} \n- phone: ${phone} \n --- \n ${notes}`
			// const summary = `${name ? name : email ? email : phone ? phone : 'no_info'}`

			if (!password || password !== passwordConfirm)
				throw Error("!!! Passwords do not match. Retype password")
			if (!passwordRegExp.test(password))
				throw Error("!!! Password strength does not meet requirements")
			if (!emailRegex.test(email)) throw Error("!!! Email not valid")

			const { db: sudoDB, graphql: sudoGQL } = context.sudo()

			const data = (await sudoGQL.run({
				query: `
              query Query($where: UserWhereInput!) {
                usersCount(where: $where)
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
			})) as { usersCount: number  }
      //? have to use gql with `insensitive` mode
			// const existingUsersCount = await query.User.count({
			// 	where: {
			// 		OR: [
			// 			{
			// 				email: {
			// 					equals: email,
			// 				},
			// 			},
			// 		],
			// 	},
			// })

			if (data.usersCount > 0)
				throw Error(
					`!!! Registration failed. If this error persists please contact ${envs.ADMIN_EMAIL_ADDRESS} to resolve this issue 🍒`
				)

			const user = await sudoDB.User.createOne({
				data: {
					name,
					email,
					authId: email,
					password,
				},
			})

			return user
		},
	})
