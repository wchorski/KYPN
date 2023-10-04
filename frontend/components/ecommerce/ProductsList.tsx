import { ProductThumbnail } from "@components/ecommerce/ProductThumbnail";
import { gql } from '@apollo/client'
import { QueryLoading } from '@components/menus/QueryLoading';
import { QueryError } from '@components/menus/QueryError';
import styles from '@/styles/ecommerce/Product.module.scss'
import { envvars } from "@lib/envvars";
import { getClient } from "@lib/gqlClient";
import { Product } from "@lib/types";
import { List } from "@components/elements/List";


type ProdProps = {
  page: number,
  categoryNames:string[],
  products:Product[],
}

export async function ProductsList({ products = [] }: ProdProps) {


  // console.log({ data });

  return (
    <List isAnimated={true} className={styles.product}>
      {/* {data.products.length <= 0 && (
        <p> No Products Available </p>
      )} */}
      {products?.map((prod: any) => {
        // console.log(prod);

        if(prod.status === 'DRAFT') return null

        return (
          <ProductThumbnail {...prod} />
        )

      })}
    </List>
  )
}

const query = gql`
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