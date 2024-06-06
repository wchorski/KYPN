import { Category, Event } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchEvents(dateSelectedString:string){

  const dateSelected = new Date(dateSelectedString)

  try {

    const events = await keystoneContext.query.Event.findMany({
      query: query,
      where: { 
        AND: [ 
          {
            start: {
              gte: dateSelected.toISOString(),
              lt: new Date(dateSelected.getFullYear(), dateSelected.getMonth() + 24).toISOString()
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
          start: 'asc'
        }
      ]
    }) as Event[]

    const count = await keystoneContext.query.Event.count({
      where: { 
        AND: [ 
          {
            start: {
              gte: dateSelected.toISOString(),
              lt: new Date(dateSelected.getFullYear(), dateSelected.getMonth() + 24).toISOString()
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
      }
    }) as number
    
    return { events, count }
    
  } catch (error) {
    console.log('fetch Events: ', error)
    return { error }
  }
}


const query = `
  typeof
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