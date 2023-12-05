import { ProductThumbnail } from "@components/ecommerce/ProductThumbnail";
import styles from '@styles/ecommerce/product.module.scss'
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
  // console.log('@@@@@@ SESSION???????????');
  // console.log(JSON.stringify(session, null, 2));
  
  // console.log({ data });

  return (
    <List isAnimated={true} className={styles.product}>
      {products?.map((prod: any, i) =>  (
        <ProductThumbnail product={prod} session={session} key={i}/>
      ))}
    </List>
  )
}