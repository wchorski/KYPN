import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { Category, Product } from "@ks/types"

const perPage = envs.PERPAGE

export async function fetchProducts(page:number, categoryNames:string[], session:any){

  const catConnects = categoryNames.map(name => ({categories: { some: { name: { equals: name }}}}))

  
  try {
    
    const count = await keystoneContext.withSession(session).query.Product.count({
    
    })
    console.log('HEYYYYY');
    console.log({count});
    

    const products = await keystoneContext.withSession(session).query.Product.findMany({
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          dateModified: "desc"
        }
      ],
      where: {
        OR: catConnects,
      },
      query: `
        excerpt
        id
        name
        price
        status
        image
      `
    })

    
    
    return { products, count }
    
  } catch (error) {
    return {error}
  }
}