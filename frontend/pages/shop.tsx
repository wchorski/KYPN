import { Pagination } from "../components/Pagination";
import { ProductsList } from "../components/ecommerce/ProductsList";
import { useRouter } from 'next/router'
import { SubscriptionPlansList } from "../components/ecommerce/SubscriptionPlansList";

export default function StorePage() {

  const { query } = useRouter()

  return (
    <>
      <div className="container">

      <Pagination route='/shop' page={Number(query.page) || 1} />
        <ProductsList page={Number(query.page) || 1} />
      <Pagination route='/shop' page={Number(query.page) || 1} />
      <hr />
      <Pagination route='/shop/subscriptions' page={Number(query.page) || 1} />
        <SubscriptionPlansList page={Number(query.page) || 1} />
      <Pagination route='/shop/subscriptions' page={Number(query.page) || 1} />
      
      </div>

    </>
  );
}
