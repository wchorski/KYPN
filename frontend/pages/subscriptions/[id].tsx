import { SubscriptionItemSingle } from "../../components/subscriptions/SubscriptionItemSingle";
import { useRouter } from "next/router";

export default function SubscriptionItemPage() {

  const router = useRouter()

  return (
    <>
      <SubscriptionItemSingle id={String(router.query.id)}/>
    </>
  )
}