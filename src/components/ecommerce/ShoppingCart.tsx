'use client'
import { calcTotalPrice } from '@lib/calcTotalPrice'
import { useCart } from '@components/hooks/CartStateContext'
import moneyFormatter from '@lib/moneyFormatter'
import styles from '@styles/ecommerce/cart.module.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CartItem from './CartItem'
import { TbArrowBarToRight } from "react-icons/tb";
import Link from 'next/link'
import { CartCount2 } from './CartCount2'
import { useSession } from 'next-auth/react'

import { LoadingAnim } from '@components/elements/LoadingAnim'
import { CartItemsList } from './CartItemsList'
import { CartTotal } from './CartTotal'

export function ShoppingCart() {

  const elementRef = useRef<HTMLDivElement | null>(null);
  
  const { isOpen, closeCart, cartItems, } = useCart()

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        elementRef.current &&
        isOpen &&
        !elementRef.current.contains(e.target as Node)
      ) {
        closeCart();
      }
    },
    [isOpen, closeCart]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside])
  

  return (
    <div 
      className={isOpen ? [styles.shoppingcart, styles.open].join(' ') : styles.shoppingcart}
      ref={elementRef}
    >

      <header>
        <button 
          onClick={e => closeCart()} 
          className={isOpen ? [styles.knob, styles.open, ].join(' ') : styles.knob }
          title="close cart"
        > 
          <TbArrowBarToRight />
        </button>
        
        <h2>
           Cart
        </h2>
        <CartCount2 count={cartItems?.reduce(
          (tally: any, cartItem: any) => tally + cartItem.quantity,
          0
        )} />
      </header>
      
      <CartItemsList />
      
      <footer>
        <p> 
          <span>Total: </span> 
          <CartTotal />
          {cartItems.filter(i => i.type === 'RENTAL').length > 0 && <em> + rental </em>}
        </p>
        <Link
          href={'/checkout'}
          onClick={() => closeCart()}
          className='button medium'
        >
          Checkout
        </Link>
      </footer>
    </div>
  )
}