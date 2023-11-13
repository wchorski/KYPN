import { Addon, Service } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchServicesAndAddons(){

  try {

    const variables = {}
    const services = await keystoneContext.sudo().query.Service.findMany({
      query: queryServices,
      ...variables,
    }) as Service[]

    const addons = await keystoneContext.sudo().query.Addon.findMany({
      query: queryAddons,
      ...variables,
    }) as Addon[]
    
    return { services, addons }
    
  } catch (error) {
    console.log('fetch Cats: ', error)
    return { error }
  }
}


const queryAddons = `
  id
  name
  excerpt
  price
  services {
    id
  }
`

const queryServices = `
  id
  name
  description
  price
  buisnessHourOpen
  buisnessHourClosed
  buisnessDays
  durationInHours
  locations {
    id
    name
    address
    rooms
    bookings {
      start
      end
    }
  }
  addons {
    id
    name
    price
  }
  employees {
    id
    name
    buisnessHourOpen
    buisnessHourClosed
    gigs {
      start
      end
    }
    availability {
      start
      end
      type
    }
  }
`