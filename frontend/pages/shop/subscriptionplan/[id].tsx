import { useRouter } from 'next/router'
import { SubscriptionPlanSingle } from '../../../components/ecommerce/SubscriptionPlanSingle';

export default function ProductByID() {
  const router = useRouter()
  // console.log(router.query);

  return (
    <SubscriptionPlanSingle id={router.query.id} />
  )
}
