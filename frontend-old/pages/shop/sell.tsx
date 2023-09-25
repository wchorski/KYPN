import { ProductCreate } from "../../components/ecommerce/ProductCreate";
import PleaseLogin from "../../components/menus/PleaseLogin";


export default function Sell() {

  return (
    <>

      <h1>Sell a Product</h1>

      <PleaseLogin>
        <ProductCreate />
      </PleaseLogin>


    </>
  )
}
