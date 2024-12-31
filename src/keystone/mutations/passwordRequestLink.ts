// cred Mafia Codes - https://www.youtube.com/watch?v=72JYhSoVYPc

import { graphql } from "@keystone-6/core"
import { Context } from ".keystone/types"
import { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"
import { User } from "../types"
import { mailPasswordRequest } from "../../lib/mail"
import jwt from "jsonwebtoken"
import { envs } from "../../../envs"

const IMG_PLACEHOLD =
	process.env.FRONTEND_URL + "/assets/product-placeholder.png"
const ADMIN_EMAIL_ADDRESS =
	process.env.ADMIN_EMAIL_ADDRESS || "no_admin_email@m.lan"

export const passwordRequestLink = (base: BaseSchemaMeta) =>
	graphql.field({
		type: base.object("User"),

		args: {
			email: graphql.arg({ type: graphql.nonNull(graphql.String) }),
		},

		// 1. Make sure they are signed in
		async resolve(source, { email }, context: Context) {
			//Query the current user
			// const user = await context.sudo().query.User.findOne({
			//   where: { email },
			//   query:
			//     `
			//       id
			//       name
			//       email
			//       password
			//     `,
			// }) as User
			const data = (await context.sudo().graphql.run({
				query: `
              query Users($where: UserWhereInput!) {
                users(where: $where) {
                  id
                  name
                  email
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
			const user = data.users[0]

			if (!user) throw new Error(`!!! passwordResetLink ❓🫥: ${email}`)

			const secret = envs.NEXTAUTH_SECRET + user.password
			const payload = {
				id: user.id,
				email: user.email,
			}
			const token = jwt.sign(payload, secret, { expiresIn: "5m" })

			const mail = await mailPasswordRequest({
				to: [email],
				resetToken: token,
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
				},
			}).catch((error) => console.log("!!! ✉️❌ passwordRequestLink Mutation: ", error))

			return {
				id: user.id,
				dateModified: user.dateModified,
			}
		},
	})
