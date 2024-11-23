import { nextAuthOptions } from "@/session";
import { keystoneContext } from "@ks/context";
import { Category, Page } from "@ks/types";
import { getServerSession } from "next-auth";
import type { PageOrderByInput, Lists } from ".keystone/types"

export default async function fetchPage(slug:string, query:string){

  try {

    const session = await getServerSession(nextAuthOptions);

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

// ? moved to the page
// const query = `

//     id
//     slug
//     title
//     template
//     dateCreated
//     dateModified
//     tags {
//       name
//     }
//     categories {
//       name
//     }
//     status
//     author{
//       id
//       name
//     }
//     content {
//       document
//     }
// `