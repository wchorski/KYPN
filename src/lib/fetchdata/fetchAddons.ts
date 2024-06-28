import { Addon, } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchAddons(session:any){

  try {

    const addons = await keystoneContext.withSession(session).query.Addon.findMany({
      query: `
        id
        name
        image
        excerpt
        price
        services {
          id
        }
      `,
    }) as Addon[]
    
    return { addons }
    
  } catch (error) {
    console.log('!!! fetch Addon by id: ', error)
    return { error }
  }
}
