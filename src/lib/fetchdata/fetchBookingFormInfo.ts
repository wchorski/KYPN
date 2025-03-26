import { keystoneContext } from '@ks/context';
import type { Addon, Availability, Booking, Location, Service, User } from "@ks/types";

type Props ={
  session:any
}
const now = new Date().toISOString()

export default async function fetchBookingFormData({session}:Props){

  // bypass all access & permissions 
  const sudoContext = keystoneContext.sudo()
  const context = keystoneContext

  try {

    const services = await context.withSession(session).query.Service.findMany({
      // where: {
      //   status: {
      //     in: [
      //       "AVAILABLE",
      //     ]
      //   },
      // },
      query: `
        id
        name
        excerpt
        price
        buisnessHourOpen
        buisnessHourClosed
        buisnessDays
        durationInHours
      `,
    }) as Service[]

    const locations = await context.withSession(session).query.Location.findMany({
      where: {
        services: {
          some: {
            id: { 
              in: services.flatMap(serv => serv.id)
            }
          }
        }
      },
      query: `
        id
        name
        address
        rooms
        services {
          id
        }
        bookings {
          id
          start
          end
        }
      `
    }) as Location[]

    const addons = await context.withSession(session).query.Addon.findMany({
      where: {
        services: {
          some: {
            id: { 
              in: services.flatMap(serv => serv.id)
            }
          }
        },
        // TODO when `stockCount` is added swich to if(stockCount > 0)
        status: {
          notIn: [
            "OUT_OF_STOCK",
          ]
        },
      },
      query: `
        id
        name
        excerpt
        price
        services {
          id
        }
      `,
    }) as Addon[]

    const employees = await sudoContext.query.User.findMany({
      where: {
        servicesProvided: {
          some: {
            id: {
              in: services.flatMap(serv => serv.id)
            }
          }
        }
      },
      query: `
        id
        name
        buisnessHourOpen
        buisnessHourClosed
        servicesProvided {
          id
        }
      `
    }) as User[]
    
    const availabilities = await sudoContext.query.Availability.findMany({
      where: {
        end: {
          gt: now
        },
        employee: {
          id: {
            in: employees.flatMap(emp => emp.id)
          }
        }
      },
      query: `
        id
        start
        end
        type
      `
    }) as Availability[]
    
    const gigs = await sudoContext.query.Booking.findMany({
      where: {
        end: {
          gt: now
        },
        status: {
          in: [
            "CONFIRMED",
            "DOWNPAYMENT",
            "HOLDING"
          ]
        },
        employees: {
          some: {
            id: {
              in: employees.flatMap(emp => emp.id)
            }
          }
        }
      },
      query: `
        id
        start
        end
        employees {
          id
        }
      `
    }) as Booking[]    
    
    // todo actually i think i want to as a users part as I don't want to be querying 1 user multple times. also I'm already querying addons multiple times too
    
    const data = { services, locations, addons, employees, availabilities, gigs }
    // console.log({data});
    return {data}
    
  } catch (error) {
    console.log('!!! fetch Booking Form Data: ', error)
    return { error }
  }
}