import { gql, useQuery } from '@apollo/client';
import ErrorMessage from '../../../components/ErrorMessage';
import { QueryLoading } from '../../../components/menus/QueryLoading';
import { ProductSingle } from '../../../components/ecommerce/ProductSingle';
import { useRouter } from 'next/router'

export default function ProductByID() {
  const router = useRouter()

  // const { loading, error, data } = useQuery(
  //   SINGLE_PRODUCT_QUERY, {
  //   variables: { where: { id: router.query.id } }
  // })
  // // console.log(data);

  // if (loading) return <QueryLoading />
  // if (error) return <ErrorMessage error={error} />


  return (
    <ProductSingle id={router.query.id} />
  )
}

// export const SINGLE_PRODUCT_QUERY = gql`
//   query Query($where: ProductWhereUniqueInput!) {
//     product(where: $where) {
//       id
//       name
//       photo {
//         altText
//         id
//         image {
//           extension
//           filesize
//           id
//           height
//           url
//           width
//         }
//       }
//       price
//       status
//       description
//     }
//   }
// `