import styled from "styled-components"


export function LoadingAnim() {
  return (
    <StyledLoading>
      <svg width="60" height="30" viewBox="-20 -20 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="tawtaw-logo">
          <rect className="rotating-rect" id="left"   x="0"       y="0" width="80" height="80" rx="10" />
          <rect className="rotating-rect" id="right"  x="120"     y="0" width="80" height="80" rx="10"  />
          <rect className="rotating-rect" id="middle" x="60"      y="0" width="80" height="80" rx="10" stroke="black" strokeWidth="4"/>
        </g>
      </svg>
    </StyledLoading>
  )
}


const StyledLoading = styled.span`
  :root{
    --c-dark: #0a1f10;
    --c-light: #194c2e;
  }

  svg {
    /* width: 100%; */
    /* height: 10em; */
  }

  #tawtaw-logo{
    fill: var(--c-light)
  }

  #left,
  #right,
  #middle {
    transition: all 1s ease;
    transform: rotate(45deg);
    /* transform-origin: center center;
    transform: rotate(45deg); */
    /* animation: alternate infinite loadingAnim 2s; */
  }

  #left{
    animation-delay: 0s;
    animation-name: leftAnim;
    /* animation-delay: .1s; */
    animation-duration: 2.1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
  }
  #middle{
    animation-name: leftAnim;
    /* animation-delay: .1s; */
    animation-duration: 2.2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    /* animation: leftAnim 3.2s alternate infinite ease-in; */
  }
  #right{
    animation-name: leftAnim;
    /* animation-delay: .2s; */
    animation-duration: 2.3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
  }

  .rotating-rect {

    transform-origin: center center;
    transform-box: fill-box;
    /* animation: loadingAnim 3s alternate infinite ease-in; */
  }
  

  @keyframes leftAnim {
    0%{
      transform: 
        translateX(0px)
        rotate(45deg)
        scale(1)
      ;
      fill: var(--c-light)
    }
    25%{
      transform: 
        translateX(10px)
        rotate(45deg)
        scale(1)
      ;
    }
    75%{
      transform: 
        translateX(-10px)
        rotate(45deg)
        scale(1)
      ;
      fill: var(--c-dark)
    }
    100%{
      transform: 
        translateX(0px)
        rotate(45deg)
        scale(1)
      ;
      fill: var(--c-light)
    }
  }


  @keyframes loadingAnim {
    0%{
      transform: 
        translateX(0px)
        rotate(45deg)
      ;
    }
    25%{
      transform: 
        translateX(50px)
        rotate(0deg)
      ;
    }
    75%{
      transform: 
        translateX(-100px)
        rotate(90deg)
      ;
    }
    100%{
      transform: 
        translateX(0px)
        rotate(45deg)
      ;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`