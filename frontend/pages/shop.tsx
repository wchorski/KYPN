import { Pagination } from "../components/Pagination";
import { ProductsList } from "../components/ecommerce/ProductsList";
import { useRouter } from 'next/router'
import { SubscriptionPlansList } from "../components/ecommerce/SubscriptionPlansList";

export default function StorePage() {

  const { query } = useRouter()

  return (
    <>
      <Pagination route='/shop' page={Number(query.page) || 1} />

      <div className="container">
        <SubscriptionPlansList page={Number(query.page) || 1} />
        <ProductsList page={Number(query.page) || 1} />
      </div>
    
      <Pagination route='/shop' page={Number(query.page) || 1} />

    </>
  );
}
