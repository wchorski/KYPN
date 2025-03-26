import { List } from "@components/elements/List";
import type { SubscriptionPlan } from "@ks/types";
import styles from '@styles/ecommerce/product.module.css'
import { getServerSession } from "next-auth";
import type { ReactElement } from "react";

import { nextAuthOptions } from "@/session";

import { SubscriptionPlanThumbnail } from "./SubscriptionPlanThumbnail";


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