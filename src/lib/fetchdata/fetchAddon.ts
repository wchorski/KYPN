import { Addon, } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchAddon(id:string){

  try {

    const addon = await keystoneContext.query.Addon.findOne({
      where: { id },
      query: `
        id
        name
        excerpt
        price
        image
        services {
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
    }) as Addon
    
    return { addon }
    
  } catch (error) {
    console.log('!!! fetch Addon by id: ', error)
    return { error }
  }
}
