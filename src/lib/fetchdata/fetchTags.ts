// cred - https://github.com/jasonkuhrt/graphql-request/blob/HEAD/examples/typescript-typed-document-node.ts

import { keystoneContext } from '@ks/context';
import type { Tag } from '@ks/types';


export default async function fetchTags(tagIds?:string[]){

  try {

    const filterByIds = tagIds ? { 
      where: {
        id: {
          in: tagIds
        } 
      }
      } : {}

    // ? doesn't work when requesting from server side (i.e. this API route)
    // const data  = await client.request(query, variables)
    // const { tags } = data
    // console.log({tags});
    
    const tags = await keystoneContext.query.Tag.findMany({
      query: query,
      ...filterByIds,
    }) as Tag[]
    // console.log({tags});

    // ? run a basic graphql (good for mutations). You can also pas it .withSession()
    // const data = await keystoneContext.graphql.run({
    //   query: query, 
    //   variables: {}
    // });
    // const { tags } = data
    // // console.log({tags});
    
    return { tags }
    
  } catch (error) {
    console.log('!!! fetch Tags: ', error)
    return { error }
    
  }
}



const query = `
  id
  name
`

//? if ur using a raw graphql request
// const query = gql`
//   query getTags {
//     tags {
//       id
//       name
//     }
//   }
// `

