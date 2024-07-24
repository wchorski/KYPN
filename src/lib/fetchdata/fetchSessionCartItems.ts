import { CartItem, Rental, Ticket } from "@ks/types";
import { keystoneContext } from '@ks/context';
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";

const now = new Date().toISOString()

export default async function fetchSessionCartItems(userId:string){

  try {
    // todo idk next-auth still works
    // @ts-ignore
    const session = await getServerSession(nextAuthOptions)

    const rentalItems = await keystoneContext.withSession(session).query.CartItem.findMany({
      query: `
        id
        type
        quantity
        product {
          id
          price
          rental_price
          name
          image
          stockCount
          orderItems {
            quantity
          }
        }
      `,
      where: {
        user: { id: { equals: userId } },
        type: { equals: 'RENTAL'},
       },
      }
    ) as CartItem[]

    const rentals = await keystoneContext.sudo().query.Rental.findMany({
      where: {
        end: {
          gte: now
        },
        status: {
           notIn: [
            'CANCELED',
            'LEAD',
           ]
        },
        order: {
          items: {
            some: {
              product: {
                id: {
                  in: rentalItems.flatMap(cartItem => cartItem.product.id)
                }
              }
            }
          }
        }
      },
      // todo i'm sure there is a more optimal way to filter
      // this data to cut down on the double fetching
      query: `
        id
        start
        end
        order {
          items {
            quantity
            product {
              id
              name
              stockCount
            }
          }
        }
      `
    }) as Rental[]

    const saleItems = await keystoneContext.withSession(session).query.CartItem.findMany({
      query: `
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
      `,
      where: {
        user: { id: { equals: userId } },
        type: { equals: 'SALE'},
       },
      }
    ) as CartItem[]
    
    return { rentalItems, rentals, saleItems }
    
  } catch (error) {
    console.log('!!! fetch session cart: ', error)
    return { error }
  }
}