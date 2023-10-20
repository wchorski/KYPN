import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { keystoneContext } from "@ks/context";
import { Page } from "@ks/types";
import { gql } from "graphql-request";

export default async function fetchPage(slug:string, session:any){

  try {

    const page = await keystoneContext.withSession(session).query.Page.findOne({
      where: { slug: slug },
      query: query
    }) as Page

    return { page }
    
  } catch (error) {
    console.log('fetch Page: ', error)
    return { error }
  }
}

// ? don't include top "query getUser" on top 
// if query direct from keystoneContext

const query = (gql`

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
      document
    }
`)