// docs - https://keystonejs.com/docs/guides/schema-extension
import { graphql } from "@keystone-6/core"
import { Context } from ".keystone/types"
import { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"
import { envs } from "../../../envs"
import { emailRegex, passwordRegExp } from "../../lib/regexPatterns"

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

			const now = new Date().toISOString()

			if (!password || password !== passwordConfirm)
				throw Error("!!! Passwords do not match. Retype password")
      if (!passwordRegExp.test(password))
        throw Error("!!! Password strength does not meet requirements")
      if(!emailRegex.test(email))
        throw Error('!!! Email not valid')

			const { db, query } = context.sudo()

			const existingUsersCount = await query.User.count({
				where: {
					OR: [
						{
							email: {
								equals: email,
							},
						},
					],
				},
			})

			if (existingUsersCount > 0)
				throw Error(
					`!!! Registration failed. If this error persists please contact ${envs.ADMIN_EMAIL_ADDRESS} to resolve this issue 🍒`
				)

			const user = await db.User.createOne({
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
