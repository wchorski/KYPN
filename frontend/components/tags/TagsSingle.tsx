import { gql, useQuery } from "@apollo/client"
import { QueryLoading } from "../menus/QueryLoading"
import ErrorMessage from "../ErrorMessage"
import { PostsList } from "../blocks/PostsList"
import { BlogList } from "../blog/BlogList"
import { BlogListItem } from "../blog/BlogListItem"
import { Post, Tag } from "../../lib/types"
import { ProductThumbnail } from "../ProductThumbnail"
import stylesProduct from '@/styles/ecommerce/Product.module.scss'
import stylesBlog from "@/styles/blog/Blog.module.scss";

type Props = {
  name:string,
}

// todo paginate this so page isn't flooded with a big DB

export function TagsSingle({name}:Props) {

  const { error, loading, data } = useQuery(QUERY_TAGS, {
    variables: {
      where: {
        name: name
      }
    }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  
  const {tag}:{tag:Tag} = data

  return (
    <>
    <h1> Archive: {name}</h1>
    <p> browse articles tagged with <strong>{name}</strong> </p>

    <div>
      <h2>Posts: </h2>
      <ul className={stylesBlog.blog}>
        {tag.posts?.map(post => (
          <li key={post.id}>
            <BlogListItem {...post}/>
          </li>
        ))} 

        {tag.posts.length === 0 && <p> no posts </p>}

      </ul>
    </div>
    <br />

    <div>
      <h2> Products: </h2>

      <ul className={stylesProduct.product}>
        {tag.products?.map(prod => (
          <li key={prod.id}>
            <ProductThumbnail {...prod}/>
          </li>
        ))}
          
        {tag.products.length === 0  && <p> no products </p>}
      </ul>
    </div>
    <br />
        
    </>
  )
}


const QUERY_TAGS = gql`
  query Query($where: TagWhereUniqueInput!) {
    tag(where: $where) {
      id
      posts {
        id
        dateCreated
        excerpt
        featured_image
        featured_video
        status
        title
        author {
          id
          name
        }
        pinned
      }
      products{
        id
        excerpt
        name
        price
        status
        image
      }
    }
  }
`
// const QUERY_CATEGORY = gql`
//   query Categories($where: CategoryWhereInput!) {
//     categories(where: $where) {
//       id
//       name
//       posts {
//         dateCreated
//         excerpt
//         featured_image
//         featured_video
//         status
//         title
//         author {
//           id
//           name
//         }
//         pinned
//       }
//     }
//   }
// `