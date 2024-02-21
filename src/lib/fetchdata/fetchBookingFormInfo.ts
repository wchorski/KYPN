import { Addon, Service, User } from "@ks/types";
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
    })

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
    })
    
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
    })

    // const data = await contextSudo.graphql.run({
    //   query: `
    //     query Query($servicesWhere: ServiceWhereInput!, $addonsWhere: AddonWhereInput!, $gigsWhere: BookingWhereInput!, $availWhere: AvailabilityWhereInput!) {
    //       services(where: $servicesWhere) {
    //         id
    //         name
    //         description
    //         price
    //         buisnessHourOpen
    //         buisnessHourClosed
    //         buisnessDays
    //         durationInHours
    //         locations {
    //           id
    //           name
    //           address
    //           rooms
    //           bookings {
    //             start
    //             end
    //           }
    //         }
    //         addons {
    //           id
    //           name
    //           price
    //         }
    //         employees {
    //           id
    //           name
    //           buisnessHourOpen
    //           buisnessHourClosed
    //           gigs(where: $gigsWhere) {
    //             start
    //             end
    //           }
    //           availability(where: $availWhere) {
    //             start
    //             end
    //             type
    //           }
    //         }
    //       }
    //       addons(where: $addonsWhere){
    //         id
    //         name
    //         excerpt
    //         price
    //         services {
    //           id
    //         }
    //       }
    //     }
    //   `,
    //   variables: {
    //     servicesWhere: {
    //       // filter upon status. Once that's put in of course
    //     },
    //     addonsWhere: {
          // status: {
          //   in: [
          //     "AVAILABLE",
          //   ]
          // },
    //     },
    //     gigsWhere: {
    //       end: {
    //         gt: now
    //       },
    //       status: {
    //         in: [
    //           "ACTIVE",
    //           "DOWNPAYMENT",
    //           "HOLD"
    //         ]
    //       },
    //     },
    //     availWhere: {
    //       end: {
    //         gt: now
    //       },
    //     }
    //   }
    // }) as {services:Service[], addons:Addon[]}

    // console.log(JSON.stringify(data, null, 2));
    // const {services, addons} = data
    
    // todo actually i think i want to as a users part as I don't want to be querying 1 user multple times. also I'm already querying addons multiple times too
    return { services, locations, addons, employees, availabilities, gigs }
    
  } catch (error) {
    console.log('fetch Booking Form Data: ', error)
    return { error }
  }
}