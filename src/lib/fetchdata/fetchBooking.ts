import { Booking } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchBooking(id:string){ 

  try {

    const booking = await keystoneContext.sudo().query.Booking.findOne({
      where: { id: id },
      query: query
    }) as Booking
    
    return { booking }
    
  } catch (error) {
    console.log('!!! fetch booking: ', error)
    return { error }
  }
}


const query = `
  id
  email
  phone
  name
  dateCreated
  dateModified
  addonsCount
  end
  google
  start
  status
  summary
  notes
  price
  details {
    document
  }
  addons {
    id
    excerpt
    name
    price
  }
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
  location {
    id
    name
    address
  }
  service {
    id
    name
  }
`