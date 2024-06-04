import { Addon, Availability, Booking, Location, Service, User } from "@ks/types";
import { keystoneContext } from '@ks/context';

const now = new Date().toISOString()

export default async function fetchBookingFormData(){

  const contextSudo = keystoneContext.sudo()

  try {

    const services = await contextSudo.query.Service.findMany({
      where: {
        // @ts-ignore this will be auto updated later by keystone
        status: {
          in: [
            "AVAILABLE",
          ]
        },
      },
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
        status: {
          in: [
            "AVAILABLE",
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

    const employees = await contextSudo.sudo().query.User.findMany({
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
    
    const availabilities = await contextSudo.sudo().query.Availability.findMany({
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
    
    const gigs = await contextSudo.sudo().query.Booking.findMany({
      where: {
        end: {
          gt: now
        },
        status: {
          in: [
            "ACTIVE",
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
    
    
    // todo actually i think i want to as a users part as I don't want to be querying 1 user multple times. also I'm already querying addons multiple times too
    const data = { services, locations, addons, employees, availabilities, gigs }
    return {data}
    
  } catch (error) {
    console.log('!!! fetch Booking Form Data: ', error)
    return { error }
  }
}