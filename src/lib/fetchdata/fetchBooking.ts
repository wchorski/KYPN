import { Booking } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchBooking(id:string){

  console.log('### fetchbook id: ', id);
  

  try {


    // todo only allow if customer id matches. Use session and filter on keystone backend
    // const booking = await keystoneContext.query.Booking.findOne({
    //   query: query,
    //   where: {
    //     id: "clsnoi17p0000svs8at1pzpad",
    //   },
    // }) as TBooking
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