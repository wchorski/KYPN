import { Pagination } from "../../components/Pagination"
import { ProductsList } from "../../components/ecommerce/ProductsList"
import { useRouter } from "next/router"


const StorePageNumber = () => {

  const { query } = useRouter()

  return (<>

    <Pagination route='/shop' page={Number(query.page) || 1} />

    <ProductsList page={Number(query.page) || 1} />

    <Pagination route='/shop' page={Number(query.page) || 1} />

  </>)
}

export default StorePageNumber