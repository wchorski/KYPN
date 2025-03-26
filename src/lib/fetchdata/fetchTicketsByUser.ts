import { keystoneContext } from "@ks/context"
import type {  Ticket  } from "@ks/types"
import { getServerSession } from "next-auth"

import { nextAuthOptions } from "@/session"

const now = new Date().toISOString()

export async function fetchTicketsByUser(userId: string) {
	try {
		const session = await getServerSession(nextAuthOptions)

		const tickets = (await keystoneContext
			.withSession(session)
			.query.Ticket.findMany({
				query: query,
        orderBy: {
          dateCreated: 'desc'
        },
				where: {
					holder: { id: { equals: userId } },
					event: {
						start: {
							gte: now, //? only get tickets if event's start date is later (greater) than today
						},
					},
				},
			})) as Ticket[]

		const sudoTicketCount = await keystoneContext.sudo().query.Ticket.count({
			where: {
				holder: { id: { equals: userId } },
				event: {
					start: {
						gte: now, //? only get tickets if event's start date is later (greater) than today
					},
				},
			},
		})

		return { tickets, sudoTicketCount }
	} catch (error) {
		console.log("!!! fetch ticket: ", error)
		return { error }
	}
}

const query = `
    typeof
    id
    status
    orderIndex
    holder{
      id
    }
    event {
      summary
      id
      start
      end
      image
      location {
        name
        id
        address
      }
    }
  
`
