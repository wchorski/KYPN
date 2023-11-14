import { Ticket } from "@ks/types";
import { keystoneContext } from '@ks/context';
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";

export default async function fetchTicket(id:string){

  try {

    const session = await getServerSession(nextAuthOptions)

    const variables = {
      where: {
        id: id,
      }
    }
    const ticket = await keystoneContext.withSession(session).query.Ticket.findOne({
      query: query,
      ...variables,
    }) as Ticket
    
    return { ticket }
    
  } catch (error) {
    console.log('!!! fetch ticket: ', error)
    return { error }
  }
}


const query = `
  qrcode
  id
  status
  email
  orderCount
  holder {
    id
    name
    nameLast
    email
  }
  event {
    id
    summary
    location {
      name
      address
      id
    }
    hosts{
      id
    }
    start
    end
    price
    image
    status
  }
`