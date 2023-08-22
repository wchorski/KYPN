import { gql, useQuery } from "@apollo/client"
import { QueryLoading } from "../menus/QueryLoading"
import ErrorMessage from "../ErrorMessage"
import { PostsList } from "../blocks/PostsList"

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

  console.log(data);
  
  const {id, posts} = data

  return (
    <>
      
      <PostsList
        header={name}
        colorOverlay="transparent"
        color="transparent"
        categories={[{id: id}]}
      />
    </>
  )
}


const QUERY_CATEGORY = gql`
  query Category($where: CategoryWhereUniqueInput!) {
    category(where: $where) {
      id
      posts {
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