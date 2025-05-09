import { keystoneContext } from '@ks/context';
import type { Location } from "@ks/types";

type Props = {
  query:string
  session:any
}

export default async function fetchLocations({query, session}:Props){

  try {

    // const variables = {}
    const locations = await keystoneContext.withSession(session).query.Location.findMany({
      query,
      // ...variables,
    }) as Location[]
    
    return { locations }
    
  } catch (error) {
    console.log('!!! fetchLocations: ', error)
    return { error }
  }
}