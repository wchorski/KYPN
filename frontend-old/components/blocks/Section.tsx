import { ReactNode } from "react"
import styled from "styled-components"

type Props = {
  children:ReactNode|ReactNode[]
  imageSrc?:string,
  color?:string,
  content?: ReactNode,
}

export function Section({color, imageSrc, content, children}:Props) {
  return (
    <StyledSection color={color} bg={imageSrc}>
      <div className="container">
        {content}
        {children}
      </div>
    </StyledSection>
  )
}


const StyledSection = styled.section<{bg?:string}>`
  background-color: ${p => p.color};
  background-image: ${p => (p.bg ? `url(${p.bg})` : '')};
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  padding: 3em 1em;
  color: var(--c-txt);

  > * {
    margin-top: 0;
  }

`

// todo
// add  variables for
// background-attachment: fixed;
// padding
// margin