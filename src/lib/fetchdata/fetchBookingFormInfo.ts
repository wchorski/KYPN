import { Addon, Availability, Booking, Location, Service, User } from "@ks/types";
import { keystoneContext } from '@ks/context';

const now = new Date().toISOString()

export default async function fetchBookingFormData(){

  // bypass all access & permissions 
  const contextSudo = keystoneContext.sudo()
  const context = keystoneContext

  try {

    const services = await context.query.Service.findMany({
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

    const locations = await contextSudo.query.Location.findMany({
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

    const addons = await contextSudo.query.Addon.findMany({
      where: {
        services: {
          some: {
            id: { 
              in: services.flatMap(serv => serv.id)
            }
          }
        },
        // status: {
        //   in: [
        //     "AVAILABLE",
        //   ]
        // },
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

    const employees = await contextSudo.query.User.findMany({
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
    
    const availabilities = await contextSudo.query.Availability.findMany({
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
    
    const gigs = await contextSudo.query.Booking.findMany({
      where: {
        end: {
          gt: now
        },
        status: {
          in: [
            "CONFIRMED",
            "DOWNPAYMENT",
            "HOLD"
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
    // console.log({gigs});
    
    
    
    // todo actually i think i want to as a users part as I don't want to be querying 1 user multple times. also I'm already querying addons multiple times too
    
    const data = { services, locations, addons, employees, availabilities, gigs }
    // console.log({data});
    return {data}
    
  } catch (error) {
    console.log('!!! fetch Booking Form Data: ', error)
    return { error }
  }
}