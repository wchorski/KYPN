import { Ticket } from "@ks/types";
import { keystoneContext } from '@ks/context';
import { getServerSession, Session } from "next-auth";
import { nextAuthOptions } from "@/session";

export default async function fetchTicket(id:string, query:string, session:Session|null){

  try {

    const ticket = await keystoneContext.withSession(session).query.Ticket.findOne({
      query,
      where: {
        id: id,
      },
    }) as Ticket
    
    return { ticket }
    
  } catch (error) {
    console.log('!!! fetchTicket: ', error)
    return { error }
  }
}