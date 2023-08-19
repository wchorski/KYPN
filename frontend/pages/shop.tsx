import { Pagination } from "../components/Pagination";
import { ProductsList } from "../components/ecommerce/ProductsList";
import { useRouter } from 'next/router'
import { SubscriptionPlansList } from "../components/ecommerce/SubscriptionPlansList";
import { LoadingAnim } from "../components/elements/LoadingAnim";
import { QueryLoading } from "../components/menus/QueryLoading";

export default function StorePage() {

  const { query } = useRouter()

  return (
    <>
      <div className="container">
      
      <Pagination route='/shop' page={Number(query.page) || 1} />
      <section className="pad">
        <ProductsList page={Number(query.page) || 1} />
      </section>
      <Pagination route='/shop' page={Number(query.page) || 1} />
      
      <hr />

      <Pagination route='/shop/subscriptions' page={Number(query.page) || 1} />
      <section className="pad">
        <SubscriptionPlansList page={Number(query.page) || 1} />
      </section>
      <Pagination route='/shop/subscriptions' page={Number(query.page) || 1} />
      
      </div>

    </>
  );
}
