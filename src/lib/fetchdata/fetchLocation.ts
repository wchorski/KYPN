import { Location } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchLocation(id:string){

  try {

    // const variables = {}
    const location = await keystoneContext.query.Location.findOne({
      query: query,
      where: { id }
    }) as Location
    
    return { location }
    
  } catch (error) {
    console.log('!!! fetch locations: ', error)
    return { error }
  }
}

const query = `
  id
  name
  address
  rooms
  events {
    id
    summary
    start
  }
  categories {
    id
    name
  }
  tags {
    id
    name
  }
`