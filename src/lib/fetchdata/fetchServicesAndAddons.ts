import { Addon, Service } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchServicesAndAddons(serviceIds?:string[], addonIds?:string[]){

  try {
    const services = await keystoneContext.sudo().query.Service.findMany({
      where: {
        status: {
          notIn: ["DRAFT"]
        },
        // include ids filtering if array is present
        ...(serviceIds && serviceIds.length > 0 ? { id : { in: serviceIds } } : {})
      },
      orderBy: [
        {
          dateCreated: "desc"
        }
      ],
      query: queryServices,
      
    }) as Service[]

    const addons = await keystoneContext.sudo().query.Addon.findMany({
      where: {
        // status: {
        //   notIn: ["DRAFT", "PRIVATE"]
        // },
        // include ids filtering if array is present
        ...(addonIds && addonIds.length > 0 ? { id : { in: addonIds } } : {})
      },
      orderBy: [
        {
          dateCreated: "desc"
        }
      ],
      query: queryAddons,
    }) as Addon[]
    
    return { services, addons }
    
  } catch (error) {
    console.log('!!! fetchServicesAndAddons: ', error)
    return { error }
  }
}


const queryAddons = `
  id
  name
  image
  excerpt
  price
  services {
    id
  }
`

const queryServices = `
  id
  name
  excerpt
  image
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