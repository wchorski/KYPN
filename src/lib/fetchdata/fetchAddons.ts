import { Addon, } from "@ks/types";
import { keystoneContext } from '@ks/context';

type Props = {
	query: string
	session: any
}

export default async function fetchAddons({session, query}:Props){

  try {

    const addons = await keystoneContext.withSession(session).query.Addon.findMany({
      query,
    }) as Addon[]
    
    return { addons }
    
  } catch (error) {
    console.log('!!! fetch Addon by id: ', error)
    return { error }
  }
}
