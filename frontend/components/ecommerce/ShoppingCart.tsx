import { calcTotalPrice } from '@/lib/calcTotalPrice'
import { useCart } from '@/lib/cartState'
import moneyFormatter from '@/lib/moneyFormatter'
import { StyledShoppingCart } from '@/styles/CartStyles.styled'
import { StyledSupreme } from '@/styles/Supreme.styled'
import React from 'react'
import { useUser } from '../menus/Session'
import CartItem from './CartItem'
import { MdClose } from "react-icons/md";
import CartCount from './CartCount'

export default function ShoppingCart() {

  const customer = useUser()
  const cartData = useCart()
  const { isOpen, openCart, closeCart } = cartData
  

  if(!customer) return <p>Login to start shopping</p>

  return (
    <StyledShoppingCart className={isOpen ? 'open' : ''}>
      <header>
        <StyledSupreme>
          {customer.name} | Cart
        </StyledSupreme>
        <CartCount count={customer.cart.reduce(
          (tally:any, cartItem:any) => tally + cartItem.quantity,
          0
        )} />
        <button onClick={e => closeCart()}> <MdClose /></button>
      </header>

      {customer.cart.length <= 0 && <p>Add your first item</p>}
      <ul>
        {customer.cart.map((item:any) => <CartItem key={item.id} item={item} />)}
      </ul>
      <footer>
        <p> <span>Total: </span> {moneyFormatter(calcTotalPrice(customer.cart))}</p>
      </footer>
    </StyledShoppingCart>
  )
}

// TODO just query user's cart and update like this i guess. 
// query Query($where: UserWhereUniqueInput!) {
//   user(where: $where) {
//     cart {
//       product {
//         id
//         name
//       }
//       quantity
//     }
//   }
// }

// {
//   "where": {
//     "id": "c343e852-1fcf-486a-bb75-24456343f1e5"
//   }
// }

// ? create cart item
// mutation CreateCartItem($data: CartItemCreateInput!) {
//   createCartItem(data: $data) {
//     product {
//       id
//     }
//   }
// }

// {
//   "data": {
//     "product": {
//       "connect": {
//         "id": "10bf2515-b0eb-4b41-9b65-98ba83176b40"
//       }
//     },
//     "quantity": 23334,
//     "user": {
//       "connect": {
//         "id": "7e3e75be-ca4f-4f8b-b87b-d66bc40fb61c"
//       }
//     }
//   }
// }


