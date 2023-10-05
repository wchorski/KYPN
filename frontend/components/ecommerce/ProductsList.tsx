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
      {products?.map((prod: any) =>  (
        <ProductThumbnail {...prod} />
      ))}
    </List>
  )
}