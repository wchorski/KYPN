import { CartItem, Ticket } from "@ks/types";
import { keystoneContext } from '@ks/context';
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";

const now = new Date().toISOString()

export default async function fetchSessionCartItems(userId:string){

  try {

    const session = await getServerSession(nextAuthOptions)

    const rentalItems = await keystoneContext.withSession(session).query.CartItem.findMany({
      query: query,
      where: {
        user: { id: { equals: userId } },
        type: { equals: 'RENTAL'},
       },
      }
    ) as CartItem[]

    const saleItems = await keystoneContext.withSession(session).query.CartItem.findMany({
      query: query,
      where: {
        user: { id: { equals: userId } },
        type: { equals: 'SALE'},
       },
      }
    ) as CartItem[]
    
    return { rentalItems, saleItems }
    
  } catch (error) {
    console.log('!!! fetch session cart: ', error)
    return { error }
  }
}

const query = `
  id
  type
  quantity
  product {
    id
    price
    rental_price
    name
    image
  }
`