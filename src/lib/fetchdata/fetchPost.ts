import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { Post, Session } from "@ks/types"

export async function fetchPost(slug:string, session:any){

  try {

    // todo if you add permissions on schema 'access' then you gotta add session here
    // const post = await keystoneContext.withSession(session).query.Post.findOne({
    const post = await keystoneContext.query.Post.findOne({
      query: query,
      where: {
        slug: slug
      }
    }) as Post
    
    return { post }
    
  } catch (error) {

    return {error}
  }
}

const query = `
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
  dateCreated
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
  content {
    document
  }
` 
