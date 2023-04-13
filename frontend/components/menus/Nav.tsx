import Link from 'next/link'
import styled from "styled-components";
import { SessionBadge, useUser } from "./Session";
import SignOutButton from './SignOutButton';
import { useCart } from '../../lib/cartState';
import CartCount from '../ecommerce/CartCount';
import { RiMenu3Line, RiMenu4Fill } from "react-icons/ri";
import { StyledNav, StyledUtilMenu } from '../../styles/menus/Nav.styled';
import SearchCarlos from './SearchCarlos';
import { MdClose, MdSearch } from 'react-icons/md';
import { useSearch } from '../../lib/useGlobalContext';
import { useNavControl } from '../../lib/useGlobalContext';
import { AnnouncementsMarquee } from '../elements/AnnouncementsMarquee';
import { EmojiFade } from '../elements/EmojiFade';

export function Nav() {

  const session = useUser()
  // console.log({session});


  const { setIsOpen, toggleCart } = useCart()
  const { isSearchOpen, toggleSearch } = useSearch()
  const { isNavOpen, toggleNav } = useNavControl()

  return (
    <StyledNav className='main-menu' id='menu-main'>
      <EmojiFade />

      <SearchCarlos />

      <div id="menu-utility">

        <button
          onClick={e => toggleSearch()}
          className={isSearchOpen ? 'toggle-menu open' : 'toggle-menu'}
        >
          {isSearchOpen ? <MdClose /> : <MdSearch />}
        </button>

        {session && (
          <button
            onClick={e => toggleCart()}
            className={isSearchOpen ? 'toggle-menu cart open' : 'toggle-menu cart'}
          >
            <CartCount count={session.cart.reduce(
              (tally: any, cartItem: any) => tally + (cartItem.product ? cartItem.quantity : 0),
              0
            )} />
          </button>
        )}

        <button
          onClick={e => toggleNav()}
          className={isNavOpen ? 'toggle-menu open' : 'toggle-menu'}
        >
          {isNavOpen ? <RiMenu4Fill /> : <RiMenu3Line />}
        </button>

      </div>

      <ul className={isNavOpen ? 'open' : ''}>
        {/* <StyledUtilMenu> */}
        {/* //TODO use mine idk */}
        {/* <SearchInput /> */}
        {/* <SearchCarlos /> */}
        {/* </StyledUtilMenu> */}


        <Link href={`/shop`}> Shop </Link>
        <Link href={`/blog`}> Blog </Link>


        {session && (<>
          <Link href={`/shop/sell`}> Sell </Link>
          <Link href={`/shop/orders`}> Orders </Link>
          <SessionBadge session={session} />

          <SignOutButton />
        </>)}

        {!session && (
          <Link href={`/auth/login`}> Login </Link>
        )}
      </ul>
    </StyledNav>
  )
}

