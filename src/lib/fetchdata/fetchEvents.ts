import { Category, Event } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchEvents(currentDate:Date){

  try {

    // const variables = {
    //   where: {
    //     start: {
    //       gte: new Date(currentDate.getFullYear(), currentDate.getMonth()).toISOString(),
    //       lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1).toISOString()
    //     }
    //   },
    //   orderBy: [
    //     {
    //       start: 'desc'
    //     }
    //   ]
    // }
    const variables = {
      where: { 
        AND: [ 
          {
            start: {
              gte: new Date(currentDate.getFullYear(), currentDate.getMonth()).toISOString(),
              lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 24).toISOString()
            },
          },
          {
            NOT: [
              {
                status: {
                  equals: "DRAFT"
                }
              },
              {
                status: {
                  equals: "CANCELED"
                }
              },
              {
                status: {
                  equals: "PAST"
                }
              },
            ]
          }
        ]
      },
      orderBy: [
        {
          start: 'desc'
        }
      ]
    }

    const events = await keystoneContext.query.Event.findMany({
      query: query,
      ...variables
    }) as Event[]

    const count = await keystoneContext.query.Event.count({

      ...variables,
    }) as number
    
    return { events, count }
    
  } catch (error) {
    console.log('fetch Events: ', error)
    return { error }
  }
}


const query = `
  id
  summary
  image
  start
  status
  end
  location {
    name
    id
  }
  price
  seats
  ticketsCount
`