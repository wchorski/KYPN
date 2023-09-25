import { Pagination } from "../../../components/Pagination"
import { useRouter } from "next/router"
import { SubscriptionPlansList } from "../../../components/ecommerce/SubscriptionPlansList"


const StorePageNumber = () => {

  const { query } = useRouter()

  return (<>

    <Pagination route='/shop/subscriptions' page={Number(query.page) || 1} />

    <SubscriptionPlansList page={Number(query.page) || 1} />

    <Pagination route='/shop/subscriptions' page={Number(query.page) || 1} />

  </>)
}

export default StorePageNumber