import { Pagination } from "../components/Pagination";
import { ProductsList } from "../components/ProductsList";
import { useRouter } from 'next/router'

export default function StorePage() {

  const { query } = useRouter()

  return (
    <>
      <h1>Store Page {query.page}</h1>

      <Pagination page={Number(query.page) || 1} />

      <ProductsList page={Number(query.page) || 1} />

      <Pagination page={Number(query.page) || 1} />

    </>
  );
}
