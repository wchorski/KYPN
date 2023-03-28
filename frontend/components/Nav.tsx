import Link from 'next/link'
import React from 'react'
import styled from "styled-components";

const StyledNav = styled.nav`
  a{
    text-decoration: none;

    &:hover{
      text-decoration: underline;
    }
  }
`

export default function Nav() {
  return (
    <StyledNav>
      <Link href={`store`}> Store </Link>
      <Link href={`sell`}> sell </Link>
      <Link href={`orders`}> orders </Link>
      <Link href={`account`}> account </Link>
      <Link href={`blog`}> Blog </Link>
    </StyledNav>
  )
}
