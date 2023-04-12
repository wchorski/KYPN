import React, { ReactNode } from 'react'
import Header from './Header'
import styled from "styled-components";
import { Footer } from './menus/Footer';
import { Nav } from './menus/Nav';

const StyledMain = styled.main`
  max-width: var(--maxWidth);
  margin: 0 auto;
`

export default function Page({ children }: PageProps) {
  return (<>

    <Header />
    <Nav />

    <StyledMain>
      {children}
    </StyledMain>

    <Footer />
  </>)
}

type PageProps = {
  children: ReactNode,
}