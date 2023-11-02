import { Ticket } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchTicket(id:string){

  try {

    const variables = {
      where: {
        id: id,
      }
    }
    const ticket = await keystoneContext.query.Ticket.findOne({
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