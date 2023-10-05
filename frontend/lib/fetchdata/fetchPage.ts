import { gql } from "@apollo/client";
import { getClient } from "@lib/gqlClient";

export default async function fetchPage(slug:string){

  try {
    console.log('--- FETCH PAGE DATA --- ');
    
    const client = getClient()
    const { data } = await client.query({query, variables: { where: { slug: slug } } })
    
    return {data}
    
  } catch (error) {
    console.log('fetch Cats: ', error)
    return { error }
  }
}

const query = gql`
  query Page($where: PageWhereUniqueInput!) {
    page(where: $where) {
      id
      slug
      title
      template
      dateCreated
      dateModified
      tags {
        name
      }
      categories {
        name
      }
      status
      author{
        id
        name
      }
      content {
        document(hydrateRelationships: true)
      }
    }
  }
`