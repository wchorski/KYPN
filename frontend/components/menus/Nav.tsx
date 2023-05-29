import Link from 'next/link'
import styled from "styled-components";
import { SessionBadge, useUser } from "./Session";
import SignOutButton from './SignOutButton';
import { useCart } from '../../lib/cartState';
import CartCount from '../ecommerce/CartCount';
import { RiMenu3Line, RiMenu4Fill } from "react-icons/ri";
import { StyledNav, StyledUtilMenu } from '../../styles/menus/Nav.styled';
import { SearchInput } from './SearchInput';
import { MdClose, MdSearch } from 'react-icons/md';
import { useSearch } from '../../lib/useGlobalContext';
import { useNavControl } from '../../lib/useGlobalContext';
import { AnnouncementsMarquee } from '../elements/AnnouncementsMarquee';
import { EmojiFade } from '../elements/EmojiFade';
import { CartCount2 } from '../ecommerce/CartCount2';
import { LinkActive } from './LinkActive';

export function Nav() {

  const session = useUser()
  console.log({session});


  const { toggleCart, isOpen } = useCart()
  const { isSearchOpen, toggleSearch } = useSearch()
  const { isNavOpen, toggleNav } = useNavControl()

  return (
    <StyledNav className='main-menu' id='menu-main'>

      <SearchInput />


      <div id="menu-utility">

        <button
          onClick={e => toggleSearch()}
          className={isSearchOpen ? 'toggle-menu open' : 'toggle-menu'}
        >
          {isSearchOpen ? <MdClose /> : <MdSearch />}
        </button>

        {session && (<>
          <SessionBadge session={session} />
          <button
            onClick={e => toggleCart()}
            className={isOpen ? 'toggle-menu cart open' : 'toggle-menu cart'}
          >
            <CartCount2 count={session.cart.reduce(
              (tally: any, cartItem: any) => tally + (cartItem.product ? cartItem.quantity : 0),
              0
            )} />
          </button>
        </>)}

        <button
          onClick={e => toggleNav()}
          id='navwich'
          className={isNavOpen ? 'toggle-menu open' : 'toggle-menu'}
        >
          {isNavOpen ? <RiMenu4Fill /> : <RiMenu3Line />}
        </button>

      </div>

      <ul className={isNavOpen ? 'menu-main open' : 'menu-main '}>
        {session && session.isAdmin && (
          <LinkActive href='/admin'> Admin </LinkActive>
        )}
        <LinkActive href='/shop'> Shop </LinkActive>
        <LinkActive href='/blog'> Blog </LinkActive>
        <LinkActive href='/about'> About </LinkActive>
        <LinkActive href='/booking'> Book a Service </LinkActive>
        <LinkActive href='/events'> Live Events </LinkActive>

        {session && (<>
          <LinkActive href='/shop/sell'> Sell </LinkActive>
          <LinkActive href='/shop/orders'> Orders </LinkActive>
        </>)}

        {!session && (
          <LinkActive href='/auth/login'> Login </LinkActive>
        )}
      </ul>

    </StyledNav>
  )
}

