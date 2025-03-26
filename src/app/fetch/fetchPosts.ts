import { keystoneContext } from "@ks/context"
import type {  Post  } from "@ks/types"
type Props = {
  query:string,
  page?:number,
  perPage?:number,
  session:any
}

export async function fetchPosts({query, page = 1, perPage = 25, session}:Props) {

  try {
    const posts = (await keystoneContext
      .withSession(session)
      .query.Post.findMany({
        query,
        skip: page * perPage - perPage,
        take: perPage,
        orderBy: [
          {
            title: "asc",
          },
        ],
        // ...variables
      })) as Post[]

    return { posts }
  } catch (error) {
    console.log("!!! fetchPosts: ", error)
    return { error }
  }
}

