import React, { ReactNode } from 'react'
import styled from 'styled-components'

export function FlexList({children}:{children:ReactNode|ReactNode[]}) {
  return (
    <StyledFlexList>
      {children}
    </StyledFlexList>
  )
}


const StyledFlexList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center;
`