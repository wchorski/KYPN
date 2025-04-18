import { Section } from "@components/blocks/Section"
import { BlogList } from "@components/blog/BlogList"
import { fetchPosts } from "@lib/fetchdata/fetchPosts"
import { getServerSession } from "next-auth"
import type { ReactElement } from "react"

import { nextAuthOptions } from "@/session"

type Props = {
  header:string,
  imageSrc?:string,
  color:string,
  colorOverlay:string,
  categories: { id:string }[]
  style?: any,
}

const query = `
  id
  title
  featured_image
  excerpt
`

// any type is a bug workaround
// @ts-ignore
export async function PostsList({header, color, colorOverlay, imageSrc, categories,}:Props):ReactElement<any, any> {
  
  const session = await getServerSession(nextAuthOptions)
  const categoryIds = categories.flatMap(cat => cat.id)
  const { posts, error} = await fetchPosts({page: 1, categoryIds, session, query})

  return (
    <Section 
      layout={'1'} 
      styles={{
        backgroundColor: color,
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      overlay={colorOverlay}
    >
      
        <h2 style={{textAlign: 'center', margin: '4rem', zIndex: '1'}}> 
          {header}
        </h2>

        <BlogList posts={posts} />
      


    </Section>
  )
}


export const QUERY_POSTS_PAGINATED = `
  query Posts($where: PostWhereInput!, $orderBy: [PostOrderByInput!]!, $take: Int, $skip: Int!) {
    posts(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
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
    }
  }
`