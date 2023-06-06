import { ReactNode } from "react"
import styled from "styled-components"

type Props = {
  children:ReactNode|ReactNode[]
  imageSrc?:string,
  color?:string,
  content: ReactNode,
}

export function Section({color, imageSrc, content, children}:Props) {
  return (
    <StyledSection color={color} bg={imageSrc}>
      {content}
      {children}
    </StyledSection>
  )
}


const StyledSection = styled.section<{bg?:string}>`
  background-color: ${p => p.color};
  background-image: ${p => (p.bg ? `url(${p.bg})` : '')};
  background-position: center;
  background-size: cover;
  padding: 3em 1em;

  > * {
    margin-top: 0;
  }

`