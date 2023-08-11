import Link from "next/link"
import styled from "styled-components"


export function Footer() {
  return (
    <StyledFooter>

      <p>powered by <Link href={`https://www.tawtaw.site`}> {"There's a Will There's a Website"}</Link> </p>

    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  /* background-color: green; */
  max-width: var(--maxWidth);
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  position: relative;
  color: var(--c-txt-rev);

  /* &::before{
    content: 'before';
  } */
  &::after{
    content: '';
    background-color: var(--c-dark);
    /* background: 
      linear-gradient(90deg, 
        var(--c-bg) 0%, 
        var(--c-primary) 25%, 
        var(--c-primary) 75%, 
        var(--c-bg) 100%); */
    position: absolute;
    z-index: -1;
    inset: 0px;
    /* transform: scaleX(3); */
  }
`