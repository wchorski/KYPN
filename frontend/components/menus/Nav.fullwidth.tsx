import Link from 'next/link'
import styled from "styled-components";
import { SessionBadge, useUser } from "../menus/Session";

import { useCart } from '../../lib/cartState';
import CartCount from '../ecommerce/CartCount';
import { RiMenu3Line, RiMenu4Fill } from "react-icons/ri";
import { StyledNav, StyledUtilMenu } from '../../styles/menus/Nav.styled';
import { SearchInput } from '../menus/SearchInput';
import { MdClose, MdKeyboardArrowDown, MdSearch } from 'react-icons/md';
import { MdAccountCircle } from "react-icons/md";
import { useSearch } from '../../lib/useGlobalContext';
import { useNavControl } from '../../lib/useGlobalContext';
import { AnnouncementsMarquee } from '../elements/AnnouncementsMarquee';
import { EmojiFade } from '../elements/EmojiFade';
import { CartCount2 } from '../ecommerce/CartCount2';
import { LinkActive } from '../menus/LinkActive';

export function NavPartyVibe() {

  const session = useUser()
  
  const { toggleCart, isOpen } = useCart()
  const { isSearchOpen, toggleSearch } = useSearch()
  const { isNavOpen, toggleNav } = useNavControl()

  return (
    <StyledNavParty className='main-menu' id='menu-main'>

      
      <SearchInput />


      <div id="menu-utility">

        {/* <button
          onClick={e => toggleSearch()}
          className={isSearchOpen ? 'toggle-menu open mobile-only' : 'toggle-menu mobile-only'}
        >
          {isSearchOpen ? <MdClose /> : <MdSearch />}
        </button> */}

        {/* {session && (<>
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
        </>)} */}

        <button
          onClick={e => toggleNav()}
          id='navwich'
          className={isNavOpen ? 'toggle-menu open' : 'toggle-menu'}
        >
          {isNavOpen ? <RiMenu4Fill /> : <RiMenu3Line />}
        </button>

      </div>

      <ul className={isNavOpen ? 'menu-main open' : 'menu-main '}>
        {session && (<>
          <li className='mobile-only'>
            <Link href='/account' className='button utility mobile-only'> <MdAccountCircle /> My Account </Link>
          </li>

          {session.isAdmin && (
            <li>
              <LinkActive href='/admin'> Admin </LinkActive>
            </li>
          )}
        </>)}
        
        <li>
          <LinkActive href='/home'> Home </LinkActive>
        </li> 
        <li>
          <LinkActive href='/blog'> DJ Mixes </LinkActive>
        </li> 
        <li>
          <LinkActive href='/packages'> 
            DJ Packages 
            <button className='sub-menu-handle'> <MdKeyboardArrowDown /> </button>
          </LinkActive>

          <ul className='sub-menu'>
            <li> <LinkActive href='/weddings'> Weddings </LinkActive></li>
            <li> <LinkActive href='/mitzvahs'> Mitzvahs </LinkActive></li>
            <li> <LinkActive href='/qitzvahs'> Quinces </LinkActive></li>
          </ul>
        </li> 
        <li>
          <LinkActive href='/photobooth'> Photo Booth </LinkActive>
        </li> 
        <li>
          <LinkActive href='/faq'> WTFAQ </LinkActive>
        </li> 
        <li>
          <LinkActive href='/reviews'> Rave Reviews </LinkActive>
        </li> 
        <li>
          <LinkActive href='/about'> About </LinkActive>
        </li> 
        <li>
          <LinkActive href='/booking'> Book a Service </LinkActive>
        </li> 
        <li>
          <LinkActive href='/events'> Events </LinkActive>
        </li> 

        {session && (
          <li className='mobile-only'>
            <Link href='/account' className='button utility mobile-only'> <MdAccountCircle /> Sign Out </Link>
          </li>
        )}

        {/* {session && (<>
          <LinkActive href='/shop/sell'> Sell </LinkActive>
          <LinkActive href='/shop/orders'> Orders </LinkActive>
        </>)} */}

        {!session && (
          <li >
            <LinkActive href='/auth/login'> Login </LinkActive>
          </li>
        )}
      </ul>

    </StyledNavParty>
  )
}


export const StyledNavParty = styled.nav`

  /* display: flex; */
  /* justify-content: space-between; */
  /* flex-direction: column; */
  /* width: 100%; */
  max-width: var(--maxWidth);
  /* transform: translateY(); */
  /* z-index: 9002; */
  z-index: 100;
  display: flex;
  /* overflow: hidden; */

  ul.menu-main {
    opacity: 0;
    pointer-events: none;
    background-color: var(--c-3);
    
    /* position: sticky; */
    top: 0;
    float: left;
    z-index: 90001;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    max-width: var(--maxWidth);
    margin: 0;
    padding: 0;
    height: 0vh;
    transition: all .5s, opacity .3s;
    position: absolute;
    top: 4em;
    /* transition: all .5s; */
    
    li{
      flex-grow: 1;
    }
    
    a{
      font-size: .9rem;
      flex-grow: 1;
      color: var(--c-txt);
      display: flex;
      /* flex-direction: column; */
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 80px;
      padding: 0 1rem;
      text-decoration: none;
      transition: all .3s;
      border: solid 1px rgba(255 255 255 /40%);
      font-size: .8rem;

      button{
        border: none;
        background-color: transparent;
        color: var(--c-txt);
        svg{font-size: 1rem}
      }
    }
  }

  a.isActive{
    background-color: var(--c-accent);
  }

  a:hover, &:focus{
    background-color: var(--c-desaturated);
  }

  #navdrawer-cont{
    margin-left: auto;
    cursor: pointer;
    float: right;
  }

  &#menu-main ul.open{
    opacity: 1;
    pointer-events: all;
    height: 70vh;
    top: 5em;
    overflow-y: scroll;
  }


  #menu-utility{
    display: flex;
    justify-content: space-between;
    margin-left: auto;
  }

  button.toggle-menu{

    display: inline-block;
    background-color: transparent;
    border: none;
    padding: 0.5em;
    transition: background .3s;

    /* input{display: none;} */

    /* &.cart {
      margin-left: auto;
    } */

    svg{
      cursor: pointer;
      border-radius: 50%;
      color: var(--c-txt-primary);
      font-size: 5rem;
      padding: .1em;
      transition: all .5s, opacity .3s;
    }

    &.open{
      svg{
        background-color: var(--c-2);
        color: var(--c-txt-primary);
      }
    }

    &:hover, &:focus{
      background: var(--c-desaturated) !important;
    }
  }

  button#navwich{
    margin-left: auto;
  }

  @media screen and (min-width: 1000px){

    button#navwich{
      display: none;
    }

    ul.menu-main{
      position: sticky;
      /* top: 0px; */
      top: 10em;
      /* background-color: blue; */
      flex-direction: row;
      position: initial;
      /* // todo why is this adding tiny bit of offset below nav */
      /* height: inherit !important; */
      height: 100%;
      /* overflow: hidden !important; */
      opacity: 1;
      pointer-events: all;

      > a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex: 1;
        padding: 0 .1em;

      }

      .mobile-only{
        display: none;
      }

      
    }
  }

  .button.utility{
    background-color: var(--c-desaturated);
  }

  .mobile-only{
    margin: 1rem 0;
  }

  /* //* sub menu stuff */
  li{position: relative}
  .sub-menu-handle{transition: all .3s}

  li > ul.sub-menu{
    color: white;
    position: absolute !important;
    top: 120%;
    background-color: grey;
    opacity: 0;
    transition: all .3s;
    pointer-events: none;

    a{
      padding: 0 1rem ;
      height: 2rem;
    }
  }

  li:has(a:hover, a:focus, .sub-menu-handle:focus){
    > a .sub-menu-handle{
      transform: rotateX(180deg) translateY(8px);
    }
    > ul.sub-menu{
      opacity: 1;
      pointer-events: all;
      top: 100%;
    } 
  }
/* 
  .mobile-only{
    display: none;
  }

  @media screen and (max-width: 1000px ){
    .mobile-only{
      display: inherit;
    }
  }
   */
`
