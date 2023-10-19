import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"

const perPage = envs.PERPAGE

export async function fetchPosts(page:number, categoryNames:string[], session:any){

  const catConnects = categoryNames.map(name => ({categories: { some: { name: { equals: name }}}}))

  try {

    const count = await keystoneContext.withSession(session).query.Post.count({
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
    })

    const posts = await keystoneContext.withSession(session).query.Post.findMany({
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
      query: query,
    })
    
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
