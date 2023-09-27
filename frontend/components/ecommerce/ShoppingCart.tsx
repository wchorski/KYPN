'use client'
import { calcTotalPrice } from '../../lib/calcTotalPrice'
import { useCart } from '../../lib/cartState'
import moneyFormatter from '../../lib/moneyFormatter'
import styles from '@styles/ecommerce/cart.module.scss'
import { StyledSupreme } from '../../styles/Supreme.styled'
import React from 'react'
import { useUser } from '../menus/Session'
import CartItem from './CartItem'
import { TbArrowBarToRight } from "react-icons/tb";
import CartCount from './CartCount'
import { CheckoutForm } from './CheckoutForm'
import Link from 'next/link'
import { CartCount2 } from './CartCount2'

export default function ShoppingCart() {

  const customer = useUser()
  const { isOpen, openCart, closeCart } = useCart()


  // if(!customer) return <p>Login to start shopping</p>

  return (
    <div 
      className={isOpen ? ['open', styles.shoppingcart].join(' ') : styles.shoppingcart}>
      <header>
        <h2>
           Cart
        </h2>
        <CartCount2 count={customer?.cart.reduce(
          (tally: any, cartItem: any) => tally + cartItem.quantity,
          0
        )} />
        <button onClick={e => closeCart()} className='close'> <TbArrowBarToRight /></button>
      </header>

      {customer?.cart.length <= 0 && <p>Add your first item</p>}
      <ul>
        {customer?.cart.map((item: any) => <CartItem key={item.id} item={item} />)}
      </ul>
      
      <footer>
        <p> <span>Total: </span> {moneyFormatter(calcTotalPrice(customer?.cart))}</p>
        <Link
          href={'/shop/checkout'}
          onClick={() => closeCart()}
          className='button medium'
        >
          Checkout
        </Link>
      </footer>
    </div>
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


