import { gql } from 'graphql-request';
import { Category } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchCategories(){

  try {

    const variables = {}
    const categories = await keystoneContext.query.Category.findMany({
      query: query,
      ...variables,
    }) as Category[]
    
    return { categories }
    
  } catch (error) {
    console.log('fetch Cats: ', error)
    return { error }
  }
}


const query = gql`
  id
  name
`