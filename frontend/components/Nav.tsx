import Link from 'next/link'
import React from 'react'
import styled from "styled-components";
import { SessionBadge, useUser } from "@/components/menus/Session";
import SignOutButton from './menus/SignOutButton';

export function Nav() {

  const session = useUser()

  return (
    <StyledNav>
      <ul>
        <Link href={`/shop`}> Shop </Link>
        <Link href={`/blog`}> Blog </Link>

        {session?.name && (<>
          <Link href={`/sell`}> Sell </Link>
          <Link href={`/orders`}> Orders </Link>
          <SessionBadge session={session}/>
          <SignOutButton />
        </>)}

        {!session?.name && (
          <Link href={`/auth/login`}> Login </Link>
        )}
      </ul>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  a{
    text-decoration: none;

    &:hover{
      text-decoration: underline;
    }
  }
  ul{
    margin: 0;
    padding: 0;
    display: flex;
    justify-self: end;
    font-size: 2rem;
    flex-wrap: wrap;
    
    a,
    button {
      padding: 1rem 3rem;
      display: flex;
      align-items: center;
      position: relative;
      text-transform: uppercase;
      font-weight: 900;
      font-size: 1em;
      background: none;
      border: 0;
      cursor: pointer;
      @media (max-width: 700px) {
        font-size: 10px;
        padding: 0 10px;
      }
      &:before {
        content: '';
        width: 2px;
        background: var(--lightGray);
        height: 100%;
        left: 0;
        position: absolute;
        transform: skew(-20deg);
        top: 0;
        bottom: 0;
      }
      &:after {
        height: 2px;
        background: red;
        content: '';
        width: 0;
        position: absolute;
        transform: translateX(-50%);
        transition: width 0.4s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
        left: 50%;
        margin-top: 2rem;
      }
      &:hover,
      &:focus {
        outline: none;
        text-decoration:none;
        &:after {
          width: calc(100% - 60px);
        }
        @media (max-width: 700px) {
          width: calc(100% - 10px);
        }
      }
    }
    @media (max-width: 1300px) {
      border-top: 1px solid var(--lightGray);
      width: 100%;
      justify-content: center;
      font-size: 1.5rem;
    }
  }
`