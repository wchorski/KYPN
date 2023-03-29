import Link from 'next/link'
import React from 'react'
import {Nav} from './Nav'
import styled  from "styled-components";
import { SearchInput } from './menus/SearchInput';

const StyledLogo = styled.div`
  background: var(--c-1);
  padding: .3em;
  margin: 0 .3em;
  transform: skew(-17deg);
  
  a{
    color: white;
    text-decoration: none;
  }

  h1{
    font-size: 1.5rem;
  }
`

const StyledHeader = styled.header`
  .bar{
    border-bottom: solid 10px var(--c-1, grey);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
  }

  .sub-bar{
    border-bottom: solid 1px var(--c-2, darkgrey);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`

export default function Header() {
  return (
    <StyledHeader>

      <div className="bar">
        <StyledLogo>
          <Link href={`/`} > <h1> Sick Fits </h1> </Link>
        </StyledLogo>
        <Nav />
      </div>

      <div className="sub-bar">
        <SearchInput />
      </div>


    </StyledHeader>
  )
}
