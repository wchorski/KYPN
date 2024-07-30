import { Category } from "@ks/types";
import { keystoneContext } from '@ks/context';

export default async function fetchCategory(name:string){

  try {

    const category = await keystoneContext.query.Category.findOne({
      where: { name: name },
      query: query,
    }) as Category

    console.log({category});
    
    
    return { category }
    
  } catch (error) {
    console.log('fetch Cat: ', error)
    return { error }
  }
}


const query = `
  id
  name
  posts {
    id
    title
    excerpt
  }
`