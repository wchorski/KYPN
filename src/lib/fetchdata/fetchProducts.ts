import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { Category, Product } from "@ks/types"

const perPage = envs.PERPAGE

export async function fetchProducts(page:number, categoryNames:string[], session:any){

  const catConnects = categoryNames.map(name => ({categories: { some: { name: { equals: name }}}}))

  
  try {
    
    const count = await keystoneContext.withSession(session).query.Product.count()
    

    const products = await keystoneContext.withSession(session).query.Product.findMany({
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          dateModified: "desc"
        }
      ],
      where: {
        OR: [
          ...catConnects,
          //? moved to backend
          // {
          //   NOT: [
          //     {
          //       OR: [
          //         {
          //           status: {
          //             equals: "DRAFT"
          //           }
          //         },
          //         // todo if added a new state
          //         {
          //           status: {
          //             equals: "PRIVATE"
          //           }
          //         },
          //       ]
          //     }
          //   ]
          // },
        ],
      },
      query: `
        excerpt
        id
        name
        price
        rental_price
        status
        image
        isForSale
        isForRent
      `
    }) as Product[]

    
    // console.log(JSON.stringify({products},null,2));
    // console.log('### prod length: ', products.length);
    
    return { products, count }
    
  } catch (error) {
    return {error}
  }
}