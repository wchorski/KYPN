import { ProductThumbnail } from "@components/ecommerce/ProductThumbnail";
import { useQuery, gql } from '@apollo/client'
import { QueryLoading } from '@components/menus/QueryLoading';
import { QueryError } from '@components/menus/QueryError';
import styles from '@/styles/ecommerce/Product.module.scss'
import { envvars } from "@lib/envvars";

const perPage = envvars.PERPAGE

type ProdProps = {
  page: number,
  categories?: {id:string}[]
}

export function ProductsList({ page, categories = [] }: ProdProps) {

  const catArray = categories.map(cat => ({categories: { some: { id: { equals: cat.id }}}}))

  const { loading, error, data } = useQuery(GET_PAGE_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          dateModified: "desc"
        }
      ],
      where: {
        OR: catArray,
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
    }
  })

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />
  // console.log({ data });

  return (
    <ul className={styles.product}>
      {/* {data.products.length <= 0 && (
        <p> No Products Available </p>
      )} */}
      {data.products.map((prod: any) => {
        // console.log(prod);

        if(prod.status === 'DRAFT') return null

        return (
          <li key={prod.id}>
            <ProductThumbnail {...prod} />

          </li>
        );
      })}
    </ul>
  )
}

export const GET_PAGE_PRODUCTS_QUERY = gql`
  query Query($where: ProductWhereInput!, $orderBy: [ProductOrderByInput!]!, $skip: Int!, $take: Int) {
    products(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
      excerpt
      id
      name
      price
      status
      image
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

export const GET_ALL_PRODUCTS = gql`
  query Products {
    products {
      id
      excerpt
      name
      price
      status
      image
      # photo {
      #   id
      #   altText
      #   image {
      #     publicUrlTransformed
      #   }
      # }
    }
  }
`