import { ReactNode } from "react"
import styled from "styled-components"

type Props = {
  children:ReactNode|ReactNode[]
  bg?:string,
}

export function Section({bg, children}:Props) {
  return (
    <StyledSection color={bg} bg={bg}>
      {children}
    </StyledSection>
  )
}


const StyledSection = styled.section<{bg?:string}>`
  background-color: #a3a3d8;
  background-color: ${p => p.color};
  background-image: ${p => (p.bg ? `url(${p.bg})` : '')};
  background-position: center;
  background-size: cover;
  background-size: cover;

`