import { Section } from "../../components/blocks/Section";
import { SubscriptionItemSingle } from "../../components/subscriptions/SubscriptionItemSingle";
import { useRouter } from "next/router";

export default function SubscriptionItemPage() {

  const router = useRouter()

  return (
    <>
    <Section>
      <SubscriptionItemSingle id={String(router.query.id)}/>
    </Section>
    </>
  )
}