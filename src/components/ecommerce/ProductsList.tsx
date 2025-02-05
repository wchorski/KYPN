import { ProductThumbnail } from "@components/ecommerce/ProductThumbnail";
import styles from '@styles/ecommerce/product.module.css'
import { Product } from "@ks/types";
import { List } from "@components/elements/List";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { ReactElement } from "react";


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