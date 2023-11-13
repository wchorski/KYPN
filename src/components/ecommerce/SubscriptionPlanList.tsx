import { ProductThumbnail } from "@components/ecommerce/ProductThumbnail";
import styles from '@styles/ecommerce/product.module.scss'
import { SubscriptionPlan } from "@ks/types";
import { List } from "@components/elements/List";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { SubscriptionPlanThumbnail } from "./SubscriptionPlanThumbnail";


type ProdProps = {
  page: number,
  categoryNames:string[],
  plans:SubscriptionPlan[],
}

export async function SubscriptionPlanList({ plans = [] }: ProdProps) {

  const session = await getServerSession(nextAuthOptions);


  return (
    <List isAnimated={true} className={styles.product}>
      {plans?.map((plan: any, i) =>  (
        <SubscriptionPlanThumbnail key={i} SubscriptionPlan={plan} session={session}/>
      ))}
    </List>
  )
}