import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { Post } from "@ks/types"

const perPage = envs.PERPAGE

export async function fetchPosts(page:number, categoryIds:string[], session:any){
  
  try {

    const context = keystoneContext.withSession(session)

    let where:any = {
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
    }
    
    
    if(categoryIds.length > 0){
      where = {
        ...where,
        OR: {categories: { some: { id: { in: categoryIds }}}},
      }
    }

    const count = await context.query.Post.count({
      where: { 
        NOT: [
          {
            status: {
              equals: "DRAFT"
            }
          },
          {
            status: {
              equals: "PRIVATE"
            }
          }
        ]
      },
    }) as number

    const posts = await context.query.Post.findMany({
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          dateModified: "desc"
        }
      ],
      where,
      query: query,
    }) as Post[]
    
    return { posts, count }
    
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
