import { ProductThumbnail } from "@components/ecommerce/ProductThumbnail";
import styles from '@styles/ecommerce/Product.module.scss'
import { Product } from "@ks/types";
import { List } from "@components/elements/List";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";


type ProdProps = {
  page: number,
  categoryNames:string[],
  products:Product[],
}

export async function ProductsList({ products = [] }: ProdProps) {

  
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