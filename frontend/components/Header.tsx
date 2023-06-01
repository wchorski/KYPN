import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import styled from "styled-components";

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE || "Shop"

type Props = {
  options: {
    isLogo?:boolean,
    isSiteTitle?:boolean,
  }
}

const default_options = {
  isLogo: true,
  isSiteTitle: true,
}

export default function Header({options = default_options}:Props) {


  return (
    <StyledHeader>

      <StyledLogo>
        <Link href={`/home`} > 
        {options.isLogo && (
          <Image src={'/assets/private/logo.svg'} width={100} height={100} alt='site logo'/>
        )}
        {options.isSiteTitle && (
          <h1> {SITE_TITLE} </h1> 
        )}
        </Link>
      </StyledLogo>

    </StyledHeader>
  )
}

const StyledLogo = styled.div`
  padding: .3em;
  margin: 0;
  /* transform: skew(-17deg); */
  /* background-color: var(--c-accent); */
  /* background-image: radial-gradient(#7272723b 20%, transparent 20%), radial-gradient(#fafafa2e 20%, transparent 20%); */
  background-position: 0 0, 50px 50px;
  background-size: 20px 20px;
  display: flex;
  align-items: center;

  &::before{
    background-color: blue;
    width: 100px;
  }

  img{
    margin: 0 1em;
  }
  
  a{
    color: var(--c-txt-rev);
    /* outline: auto var(--c-accent); */
    text-decoration: none;
    flex: 1;
  }
  
  h1{
    /* font-size: 3rem; */
    background-color: var(--c-accent);
    text-shadow: #00000040 1px 1px 10px;
    padding: 0 1em;
    font-size: 1.5rem;
  }
`

const StyledHeader = styled.header`
  max-width: var(--maxWidth);

  .bar{
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
