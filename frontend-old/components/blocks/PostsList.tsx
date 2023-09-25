import { gql } from "@apollo/client";
import { BlogList } from "../blog/BlogList"

type Props = {
  header:string,
  imageSrc?:string,
  color:string,
  colorOverlay:string,
  categories: { id:string }[]
  style?: any,
}

export function PostsList({header, color, colorOverlay, imageSrc, categories,}:Props) {
  
  return (
    <section style={{
      backgroundColor: color,
      backgroundImage: `url(${imageSrc})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}>
      <div className="overlay" style={{backgroundColor: colorOverlay, padding: '1em 0 10em 0',}}>
        <div 
          className="wrapper" 
          style={{maxWidth: 'var(--maxWidth)', marginInline: 'auto'}}
        >
          <h2 style={{textAlign: 'center', margin: '4rem'}}> 
            {header}
          </h2>

          <BlogList page={1} categories={categories}/>
        </div>
      </div>
    </section>
  )
}


export const QUERY_POSTS_PAGINATED = gql`
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