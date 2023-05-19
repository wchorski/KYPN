import styled from "styled-components"


export function Footer() {
  return (
    <StyledFooter>

      <p>hey</p>
      <p>what's</p>
      <p>up</p>

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

  /* &::before{
    content: 'before';
  } */
  &::after{
    content: 'after todo';
    background: 
      linear-gradient(90deg, 
        var(--c-bg) 0%, 
        var(--c-3) 25%, 
        var(--c-3) 75%, 
        var(--c-bg) 100%);
    position: absolute;
    z-index: -1;
    inset: 0px;
    /* transform: scaleX(3); */
  }
`