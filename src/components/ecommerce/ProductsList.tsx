import { ProductThumbnail } from "@components/ecommerce/ProductThumbnail";
import styles from '@styles/ecommerce/Product.module.scss'
import { Product } from "@ks/types";
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