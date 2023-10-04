import { gql } from "@apollo/client"
import { envvars } from "@lib/envvars"
import { getClient } from "@lib/gqlClient"
import { Category } from "@lib/types"

const perPage = envvars.PERPAGE

type Props = {
  page:number,
  categoryNames: string[],
}

export async function fetchProducts({categoryNames, page}:Props){

  const catConnects = categoryNames.map(name => ({categories: { some: { name: { equals: name }}}}))

  try {
    const client = getClient()
    const { data } = await client.query({query, variables: {
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          dateModified: "desc"
        }
      ],
      where: {
        OR: catConnects,
        NOT: [
          {
            OR: [
              {
                status: {
                  equals: "DRAFT"
                }
              },
              {
                status: {
                  equals: "PRIVATE"
                }
              },
            ]
          }
        ]
      },
    }})
    
    return {data}
    
  } catch (error) {
    // console.log('fetch Products: ', JSON.stringify(error, null, 2))
    // console.log('fetch Products: ', JSON.stringify(error, null, 2))
    return {error}
  }
}

const query = gql`
  query Query($where: ProductWhereInput!, $orderBy: [ProductOrderByInput!]!, $skip: Int!, $take: Int) {
    products(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
      excerpt
      id
      name
      price
      status
      image
    }
  }
`