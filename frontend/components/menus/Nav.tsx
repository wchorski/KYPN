import Link from 'next/link'
import React from 'react'
import styled from "styled-components";
import { SessionBadge, useUser } from "./Session";
import SignOutButton from './SignOutButton';
import { useCart } from '../../lib/cartState';
import CartCount from '../ecommerce/CartCount';
import { RiMenu3Line, RiMenu4Fill } from "react-icons/ri";
import { StyledNav, StyledUtilMenu } from '../../styles/menus/Nav.styled';
import SearchCarlos from './SearchCarlos';
import { MdSearch } from 'react-icons/md';

export function Nav() {

  const session = useUser()
  // console.log({session});


  const { setIsOpen } = useCart()

  return (
    <StyledNav className='main-menu'>
      <SearchCarlos />

      <div id="search-nav-menu-cont">

        <label htmlFor="searchcheckbox" id='searchcheckbox-cont' className='toggle-menu'>
          <input type='checkbox' id='searchcheckbox' />
          <MdSearch />
        </label>

        <label htmlFor="navcheckbox" id='navdrawer-cont' className='toggle-menu'>

          <input type='checkbox' id='navcheckbox' />
          <RiMenu4Fill />
          {/* <RiMenu3Line /> */}
        </label>

      </div>


      <ul id='nav-list'>
        {/* <StyledUtilMenu> */}
        {/* //TODO use mine idk */}
        {/* <SearchInput /> */}
        {/* <SearchCarlos /> */}
        {/* </StyledUtilMenu> */}


        <Link href={`/shop`}> Shop </Link>
        <Link href={`/blog`}> Blog </Link>
        <Link href={`/shop`}> Shop </Link>
        <Link href={`/blog`}> Blog </Link>
        <Link href={`/shop`}> Shop </Link>
        <Link href={`/blog`}> Blog </Link>
        <Link href={`/shop`}> Shop </Link>
        <Link href={`/blog`}> Blog </Link>
        <Link href={`/shop`}> Shop </Link>
        <Link href={`/blog`}> Blog </Link>
        <Link href={`/shop`}> Shop </Link>
        <Link href={`/blog`}> Blog </Link>
        <Link href={`/shop`}> Shop </Link>
        <Link href={`/blog`}> Blog </Link>

        {session && (<>
          <Link href={`/shop/sell`}> Sell </Link>
          <Link href={`/shop/orders`}> Orders </Link>
          <SessionBadge session={session} />
          <button onClick={e => setIsOpen(true)}>
            My Cart
            <CartCount count={session.cart.reduce(
              (tally: any, cartItem: any) => tally + (cartItem.product ? cartItem.quantity : 0),
              0
            )} />
          </button>
          <SignOutButton />
        </>)}

        {!session && (
          <Link href={`/auth/login`}> Login </Link>
        )}
      </ul>
    </StyledNav>
  )
}

