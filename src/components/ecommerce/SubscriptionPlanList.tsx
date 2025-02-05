import { ProductThumbnail } from "@components/ecommerce/ProductThumbnail";
import styles from '@styles/ecommerce/product.module.css'
import { SubscriptionPlan } from "@ks/types";
import { List } from "@components/elements/List";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { SubscriptionPlanThumbnail } from "./SubscriptionPlanThumbnail";
import { ReactElement } from "react";


type ProdProps = {
  page: number,
  categoryNames:string[],
  plans:SubscriptionPlan[],
}
// any type is a bug workaround
// @ts-ignore
export async function SubscriptionPlanList({ plans = [] }: ProdProps):ReactElement<any, any> {

  const session = await getServerSession(nextAuthOptions);


  return (
    <List isAnimated={true} className={styles.product}>
      {plans?.map((plan: any, i) =>  (
        <SubscriptionPlanThumbnail key={i} SubscriptionPlan={plan} session={session}/>
      ))}
    </List>
  )
}