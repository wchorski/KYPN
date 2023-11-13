import { Booking, } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchBooking(id:string){

  try {

    const variables = {
      where: {
        id: id,
      }
    }
    // todo only allow if customer id matches
    const booking = await keystoneContext.sudo().query.Booking.findOne({
      query: query,
      ...variables,
    }) as Booking
    
    return { booking }
    
  } catch (error) {
    console.log('!!! fetch booking: ', error)
    return { error }
  }
}


const query = `
  addons {
    id
    excerpt
    name
    price
  }
  email
  phone
  name
  customer {
    id
    email
    phone
    name
    nameLast
  }
  employees {
    id
    name
    email
    image
  }
  dateCreated
  dateModified
  addonsCount
  end
  google
  id
  location {
    id
    name
    address
  }
  notes
  price
  service {
    id
    name
  }
  start
  status
  summary
`