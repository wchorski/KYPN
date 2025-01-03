import { Location } from "@ks/types";
import { keystoneContext } from '@ks/context';

type Props = {
  id:string,
  query:string,
  session:any
}

export default async function fetchLocation({id, session, query}:Props){

  try {

    // const variables = {}
    const location = await keystoneContext.withSession(session).query.Location.findOne({
      query,
      where: { id }
    }) as Location
    
    return { location }
    
  } catch (error) {
    console.log('!!! fetchLocations: ', error)
    return { error }
  }
}
