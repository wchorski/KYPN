// docs - https://keystonejs.com/docs/guides/schema-extension
import { graphql } from "@keystone-6/core"
import { Context } from ".keystone/types"
import { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"
import { mailContact } from "../../lib/mail"
import { envs } from "../../../envs"

export const contact = (base: BaseSchemaMeta) =>
	graphql.field({
		//TODO maybe switch this to Booking as it is a LEAD creator
		// but this wouldn't fly with sites that don't use Booking data
		type: base.object("User"),
		args: {
			name: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			customerId: graphql.arg({ type: graphql.String }),
			email: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			tel: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			start: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			notes: graphql.arg({ type: graphql.nonNull(graphql.String) }),
		},

		async resolve(source, variables, context: Context) {
			const { name, email, tel, notes, start, customerId } = variables
			// const concatNotes = `- name: ${name} \n- email: ${email} \n- tel: ${tel} \n --- \n ${notes}`
			// const summary = `${name ? name : email ? email : tel ? tel : 'no_info'}`

			const now = new Date().toISOString()

			const { query: sudoQuery } = context.sudo()

			// todo mail moved to booking afterOpt
			const user = await sudoQuery.User.findOne({
				where: { id: customerId || "no_user_id" },
				query: `
          id
        `,
			})

			mailContact({
				to: [envs.ADMIN_EMAIL_ADDRESS],
				contact: {
					customerId: user?.id,
					name,
					email,
					tel,
					start,
					notes,
				},
			}).catch((error) => {
				console.log("!!! contact email failed")
				return { error, ok: false }
			})

			// return user
			return {
				id: customerId,
			}
		},
	})
