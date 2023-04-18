import Link from 'next/link'
import React from 'react'
import { Nav } from './menus/Nav'
import styled from "styled-components";
import { SearchInput } from './menus/SearchInput';
import ShoppingCart from './ecommerce/ShoppingCart';
import SearchCarlos from './menus/SearchInput';

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE || "Shop"

export default function Header() {


  return (
    <StyledHeader>

      <StyledLogo>
        <Link href={`/`} > <h1> {SITE_TITLE} </h1> </Link>
      </StyledLogo>

      {/* <div className="util-menu"> */}
      {/* //TODO use mine idk */}
      {/* <SearchInput /> */}
      {/* <SearchCarlos /> */}
      {/* </div> */}

      {/* <ShoppingCart /> */}

    </StyledHeader>
  )
}

const StyledLogo = styled.div`
  background: var(--c-1);
  padding: .3em;
  margin: 0;
  /* transform: skew(-17deg); */
  background-color: var(--c-1);
  background-image: radial-gradient(#7272723b 20%, transparent 20%), radial-gradient(#fafafa2e 20%, transparent 20%);
  background-position: 0 0, 50px 50px;
  background-size: 20px 20px;

  &::before{
    background-color: blue;
    width: 100px;
  }
  
  a{
    color: white;
    outline: auto;
    text-decoration: none;
  }
  
  h1{
    text-shadow: #00000040 1px 1px 10px;
    padding: 0 1em;
    font-size: 1.5rem;
  }
`

const StyledHeader = styled.header`
  max-width: var(--maxWidth);

  .bar{
    border-bottom: solid 10px var(--c-1, grey);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
  }

  .util-menu{
    border-bottom: solid 1px var(--c-2, darkgrey);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`
