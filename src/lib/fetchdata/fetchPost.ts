import { envs } from "@/envs"
// import type { Lists } from ".keystone/types"
// type Post = Lists.Post["fields"]
//todo there must be a right way to pull types in from ks. i'm so close
import { keystoneContext } from "@ks/context"
import type { PostCreateInput as Post } from ".keystone/types"

export async function fetchPost(slug:string, session:any){

  try {

    // todo if you add permissions on schema 'access' then you gotta add session here
    // const post = await keystoneContext.withSession(session).query.Post.findOne({
    const post = await keystoneContext.withSession(session).query.Post.findOne({
      query: query,
      where: {
        slug: slug
      }
    }) as Post & {id:string, content: {document: any}, author: {name:string, id:string}}
    
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
