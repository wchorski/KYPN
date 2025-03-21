import { ProductThumbnail } from "@components/ecommerce/ProductThumbnail";
import { List } from "@components/elements/List";
import type { Product } from "@ks/types";
import styles from '@styles/ecommerce/product.module.css'
import { getServerSession } from "next-auth";
import type { ReactElement } from "react";

import { nextAuthOptions } from "@/session";


type ProdProps = {
  page: number,
  categoryNames:string[],
  products:Product[],
}

// any type is a bug workaround
// @ts-ignore
export async function ProductsList({ products = [] }: ProdProps):ReactElement<any, any> {

  const session = await getServerSession(nextAuthOptions);

  return (
    <List isAnimated={true} className={styles.product}>
      {products?.map((prod: any, i) =>  (
        <ProductThumbnail product={prod} session={session} key={i}/>
      ))}
    </List>
  )
}