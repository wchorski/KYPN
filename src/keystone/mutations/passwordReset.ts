import { graphql } from "@keystone-6/core"
import { Context } from ".keystone/types"
import { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"
import { mailPasswordRequest, mailPasswordResetConfirm } from "../../lib/mail"

import jwt from "jsonwebtoken"

import { envs } from "../../../envs"
import { passwordRegExp } from "../../lib/regexPatterns"
import { User } from "../types"

const IMG_PLACEHOLD =
	process.env.FRONTEND_URL + "/assets/product-placeholder.png"
const ADMIN_EMAIL_ADDRESS =
	process.env.ADMIN_EMAIL_ADDRESS || "no_admin_email@m.lan"

type Payload = {
	id: string
	email: string
	iat: number
	exp: number
}

export const passwordReset = (base: BaseSchemaMeta) =>
	graphql.field({
		type: base.object("User"),

		args: {
			password: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			token: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			email: graphql.arg({ type: graphql.nonNull(graphql.String) }),
		},

		// 1. Make sure they are signed in
		async resolve(source, { password, token, email }, context: Context) {
			try {
				if (password && !passwordRegExp.test(password))
					throw new Error("Password strength does not meet requirements")

				// const foundUser = await context.sudo().query.User.findOne({
				// 	where: { email: email },
				// 	query: `
        //     password
        //   `,
				// })

				const data = (await context.sudo().graphql.run({
					query: `
                  query Users($where: UserWhereInput!) {
                    users(where: $where) {
                      password
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
				})) as { users: User[] }
				const foundUser = data.users[0]

				if (!foundUser)
					throw new Error("!!! passwordReset: no foundUser found in database")

				const secret = envs.NEXTAUTH_SECRET + foundUser.password

				// verify token
				const payload = (await jwt.verify(token, secret)) as Payload

				// update user
				const user = await context.sudo().db.User.updateOne({
					where: { id: payload.id },
					data: {
						password,
					},
				})
				if (!user)
					throw new Error("!!! passwordReset: no user found in database")

				const mail = await mailPasswordResetConfirm({
					to: [user.email],
					user,
				})
			} catch (error) {
				console.log("!!! passwordReset ERROR: ", error)
				throw new Error("Link is stale. Request a new password reset link")
				// return {
				//   status: 'error',
				//   message: 'password reset failed'
				// }
			}

			return {
				status: "success",
				message: "account password successfully reset",
				// dateModified: new Date().toISOString(),
			}
		},
	})
