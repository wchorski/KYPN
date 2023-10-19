import { gql } from "@apollo/client";
import { keystoneContext } from "@ks/context";
import { getClient } from "@lib/gqlClient";

export default async function fetchPage(slug:string, session:any){

  try {
    // console.log('--- FETCH PAGE DATA --- ');
    // const client = getClient()
    // const { data } = await client.query({query, variables: { where: { slug: slug } } })

    const page = await keystoneContext.withSession(session).query.Page.findOne({
      where: { slug: slug },
      query: `
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
      `
    });

    return { page }
    
  } catch (error) {
    console.log('fetch Page: ', error)
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