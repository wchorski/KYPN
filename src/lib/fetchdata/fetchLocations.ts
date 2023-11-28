import { Location } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchLocations(){

  try {

    // const variables = {}
    const locations = await keystoneContext.query.Location.findMany({
      query: query,
      // ...variables,
    }) as Location[]
    
    return { locations }
    
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