// cred - codeBlocks - https://www.youtube.com/watch?v=OotCLwM0-bY

import styled from "styled-components";

export const StyledUtilMenu = styled.div`

  border-bottom: solid 1px var(--c-2, darkgrey);
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: auto;
  
`

export const StyledNav = styled.nav`

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* width: 100%; */
  max-width: var(--maxWidth);
  transform: translateY();

  ul{
    opacity: 0;
    pointer-events: none;
    background-color: var(--c-1);
    /* position: sticky; */
    top: 0;
    float: left;
    z-index: 90001;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: var(--maxWidth);
    margin: 0;
    padding: 0;
    height: 0vh;
    transition: all .5s, opacity .3s;
    /* transition: all .5s; */
    
    a{
      padding: 1em 2em;
      border-bottom: 1px solid black;
      color: var(--c-txt-rev);
      text-align: end;
    }
  }

  .toggle-menu{

    display: flex;
    align-items: center;

    input{display: none;}

    svg{
      cursor: pointer;
      color: var(--c-1);
      font-size: 5rem;
      padding: .1em;
      transition: all .5s, opacity .3s;
    }
    
  }

  #navdrawer-cont{
    margin-left: auto;
    cursor: pointer;
    float: right;

    /* input{ display: none } */

    /* svg{
      cursor: pointer;
      color: var(--c-1);
      font-size: 50px;
      
    } */

    /* NAV IS OPEN */
    /* &:has(#navcheckbox:checked){

      svg{
        background-color: var(--c-1);
        color: var(--c-txt-rev);
      }

      & ~ ul{
        opacity: 1;
        pointer-events: all;
        height: 100vh;
      }
    } */
  }

  /* #searchcheckbox-cont{
    &:has(#searchcheckbox:checked){
      svg{
        color: red;
      }
    }
  } */
  #search-nav-menu-cont{

    & :has(input[type=checkbox]:checked){

      svg{
        background-color: var(--c-1);
        color: var(--c-txt-rev);
      }

    }

    & :has(#searchcheckbox:checked){
      
      & ~ .search-cont{

        input{
          height: 600px;
        }
      }
    }

    &:has(#navcheckbox:checked){

      & ~ ul{
        opacity: 1;
        pointer-events: all;
        height: 100vh;
      }
    }
  }

  /* label.toggle-menu{

    input[type=checkbox]:checked{
      svg{
        color: red;
      }
    }
  } */

  

  /* #navcheckbox:checked ~ ul{
    height: 100vh;
    color: blue;
  }
  #navcheckbox ~ * {
    background-color: blue;
    color: red;
  }
  #navcheckbox:checked ~ *{
    background-color: green;
  } */

  /* //* wesbos code */
  /* a{
    text-decoration: none;

    &:hover{
      text-decoration: underline;
    }
  }
  ul{
    margin: 0;
    padding: 0;
    display: flex;
    justify-self: end;
    font-size: 2rem;
    flex-wrap: wrap;
    
    a,
    button {
      padding: 1rem 3rem;
      display: flex;
      align-items: center;
      position: relative;
      text-transform: uppercase;
      font-weight: 900;
      font-size: 1em;
      background: none;
      border: 0;
      cursor: pointer;
      @media (max-width: 700px) {
        font-size: 10px;
        padding: 0 10px;
      }
      &:before {
        content: '';
        width: 2px;
        background: var(--lightGray);
        height: 100%;
        left: 0;
        position: absolute;
        transform: skew(-20deg);
        top: 0;
        bottom: 0;
      }
      &:after {
        height: 2px;
        background: red;
        content: '';
        width: 0;
        position: absolute;
        transform: translateX(-50%);
        transition: width 0.4s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
        left: 50%;
        margin-top: 2rem;
      }
      &:hover,
      &:focus {
        outline: none;
        text-decoration:none;
        &:after {
          width: calc(100% - 60px);
        }
        @media (max-width: 700px) {
          width: calc(100% - 10px);
        }
      }
    }
    @media (max-width: 1300px) {
      border-top: 1px solid var(--lightGray);
      width: 100%;
      justify-content: center;
      font-size: 1.5rem;
    }
  } */
`