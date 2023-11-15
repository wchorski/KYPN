import { Ticket } from "@ks/types";
import { keystoneContext } from '@ks/context';
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";

const now = new Date().toISOString()

export default async function fetchTicketsByUser(userId:string){

  try {

    const session = await getServerSession(nextAuthOptions)

    const tickets = await keystoneContext.withSession(session).query.Ticket.findMany({
      query: query,
      where: {
        holder: { id: { equals: userId } },
        event: {
          start: {
            gte: now //? only get tickets if event's start date is older (greater) than today
          }
        }
       },
      }
    ) as Ticket[]
    
    return { tickets }
    
  } catch (error) {
    console.log('!!! fetch ticket: ', error)
    return { error }
  }
}

const query = `
  
    id
    status
    holder{
      id
    }
    event {
      summary
      id
      start
      end
      location {
        name
        id
        address
      }
    }
  
`