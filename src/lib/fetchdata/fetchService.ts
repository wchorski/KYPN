import { Service, } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchService(id:string){

  try {

    const service = await keystoneContext.query.Service.findOne({
      where: { id },
      query: `
        id
        name
        description {
          document
        } 
        price
        image
        durationInHours
        buisnessHourOpen
        buisnessHourClosed
        buisnessDays
        addons {
          id
          name
        }
        locations {
          id
          name
        }
        categories {
          id
          name
        }
        tags {
          id
          name
        }
      `,
    }) as Service
    
    return { service }
    
  } catch (error) {
    console.log('!!! fetch Service by id: ', error)
    return { error }
  }
}
