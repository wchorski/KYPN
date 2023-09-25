import { gql, useQuery } from "@apollo/client"
import { QueryLoading } from "../menus/QueryLoading"
import ErrorMessage from "../ErrorMessage"
import { PostsList } from "../blocks/PostsList"
import { BlogList } from "../blog/BlogList"
import { BlogListItem } from "../blog/BlogListItem"
import { Category, Post } from "../../lib/types"
import { ProductThumbnail } from "../ProductThumbnail"
import stylesProduct from '@/styles/ecommerce/Product.module.scss'
import stylesBlog from "@/styles/blog/Blog.module.scss";

type Props = {
  name:string,
}

export function CategoriesSingle({name}:Props) {

  const { error, loading, data } = useQuery(QUERY_CATEGORY, {
    variables: {
      where: {
        name: name
      }
    }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  
  const {category}:{category:Category} = data

  return (
    <>
    <h1> Archive: {name}</h1>
    <p> browse articles categories by <strong>{name}</strong> </p>

    <div>
      <h2>Posts: </h2>
      <ul className={stylesBlog.blog}>
        {category.posts?.map(post => (
          <li key={post.id}>
            <BlogListItem {...post}/>
          </li>
        ))} 

        {category.posts.length === 0  && <p> no posts </p>}
      </ul>
    </div>

    <div>
      <h2> Products: </h2>

      <ul className={stylesProduct.product}>
      {category.products?.map(prod => (
        <li key={prod.id}>
          <ProductThumbnail {...prod}/>
        </li>
      ))}
          
        {category.products.length === 0  && <p> no products </p>}
      </ul>
    </div>
        
    </>
  )
}


const QUERY_CATEGORY = gql`
  query Category($where: CategoryWhereUniqueInput!) {
    category(where: $where) {
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