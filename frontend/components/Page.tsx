import React, { ReactNode } from 'react'
import Header from './Header'
import styled from "styled-components";

const StyledMain = styled.main`
  max-width: var(--maxWidth);
  margin: 0 auto;
`

export default function Page({children}: PageProps) {
  return (
    <StyledMain>
      <Header />
      {children}
    </StyledMain>
  )
}

type PageProps = {
  children: ReactNode,
}