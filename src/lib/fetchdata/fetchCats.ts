import { Category } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchCategories(categoryIds?:string[]){

  const filterByIds = categoryIds ? { 
    where: {
      id: {
        in: categoryIds
      } 
    }
    } : {}

  try {

    const variables = {}
    const categories = await keystoneContext.query.Category.findMany({
      query: query,
      ...filterByIds,
    }) as Category[]
    
    return { categories }
    
  } catch (error) {
    console.log('fetch Cats: ', error)
    return { error }
  }
}


const query = `
  id
  name
`