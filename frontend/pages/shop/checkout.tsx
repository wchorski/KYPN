import styled from "styled-components";
import CartCount from "../../components/ecommerce/CartCount";
import CartItem from "../../components/ecommerce/CartItem";
import { CheckoutForm } from "../../components/ecommerce/CheckoutForm";
import { useUser } from "../../components/menus/Session";
import { calcTotalPrice } from "../../lib/calcTotalPrice";
import moneyFormatter from "../../lib/moneyFormatter";
import { StyledSupreme } from "../../styles/Supreme.styled";


export default function CheckoutPage() {

  const session = useUser()

  return (
    <StyledCheckout>
      <header>
        <StyledSupreme>
          {session?.name} | Cart
        </StyledSupreme>
        <CartCount count={session?.cart.reduce(
          (tally: any, cartItem: any) => tally + cartItem.quantity,
          0
        )} />

      </header>

      {session?.cart.length <= 0 && <p>Add your first item</p>}
      <ul>
        {session?.cart.map((item: any) => <CartItem key={item.id} item={item} />)}
      </ul>
      <footer>
        <p className="total"> <strong>Total: </strong> {moneyFormatter(calcTotalPrice(session?.cart))}</p>
        <CheckoutForm />
      </footer>

    </StyledCheckout>
  )
}


const StyledCheckout = styled.div`
  
  footer{
    .total{
      text-align: right;
    }
  }
`