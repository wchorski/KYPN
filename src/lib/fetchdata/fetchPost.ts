import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { Post, Session } from "@ks/types"
import { gql } from "graphql-request"

export async function fetchPost(slug:string, session:any){

  try {


    const post = await keystoneContext.withSession(session).query.Post.findOne({
      query,
      where: {
        slug: slug
      }
    }) as Post
    
    return { post }
    
  } catch (error) {

    return {error}
  }
}

const query = gql`
  id
  title
  featured_image
  featured_video
  author {
    id
    name
    nameLast
    url
  }
  dateModified
  excerpt
  pinned
  slug
  status
  template
  tags {
    id
    name
  }
  categories {
    id
    name
  }
` 
