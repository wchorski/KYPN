import { gql } from "@apollo/client";
import { BlogList } from "../blog/BlogList"

type Props = {
  header:string,
  imageSrc:string,
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
      <div className="overlay" style={{backgroundColor: colorOverlay, padding: '12em 1em',}}>
        <h2 style={{textAlign: 'center'}}> 
          {header}
        </h2>
        <br />
        <br />
        <BlogList page={1} categories={categories}/>
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