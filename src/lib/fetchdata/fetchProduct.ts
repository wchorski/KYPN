import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { Product } from "@ks/types"
import { gql } from "graphql-request"

const perPage = envs.PERPAGE

export async function fetchProduct(id:string, session:any){
  
  try {

    // const product = await keystoneContext.withSession(session).query.Product.findOne({
    const product = await keystoneContext.query.Product.findOne({
      where: {
        id: id,
      },
      query: query
    }) as Product
    
    return { product }
    
  } catch (error) {
    return {error}
  }
}

const query = gql`
  id
  name
  image
  price
  status
  excerpt
  description {
    document
  }
  author{
    id
    name
  }
  tags {
    name
    id
  }
  categories {
    name
    id
  }
`