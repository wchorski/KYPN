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

  /* display: flex; */
  /* justify-content: space-between; */
  /* flex-direction: column; */
  /* width: 100%; */
  max-width: var(--maxWidth);
  /* transform: translateY(); */
  /* z-index: 9002; */
  z-index: 100;
  display: flex;
  /* overflow: hidden; */

  ul.menu-main {
    opacity: 0;
    pointer-events: none;
    background-color: var(--c-3);
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
      color: var(--c-txt-primary);
      text-align: end;
      text-decoration: none;
    }
  }

  a.isActive{
    background-color: var(--c-accent);
  }

  #navdrawer-cont{
    margin-left: auto;
    cursor: pointer;
    float: right;
  }

  &#menu-main ul.open{
    opacity: 1;
    pointer-events: all;
    height: 70vh;
    overflow-y: scroll;
  }


  #menu-utility{
    display: flex;
    justify-content: space-between;
  }

  button.toggle-menu{

    display: inline-block;
    background-color: transparent;
    border: none;
    padding: 0.5em;
    transition: background .3s;

    /* input{display: none;} */

    /* &.cart {
      margin-left: auto;
    } */

    svg{
      cursor: pointer;
      border-radius: 50%;
      color: var(--c-txt-primary);
      font-size: 5rem;
      padding: .1em;
      transition: all .5s, opacity .3s;
    }

    &.open{
      svg{
        background-color: var(--c-2);
        color: var(--c-txt-primary);
      }
    }

    &:hover{
      background: var(--c-2) !important;
    }
  }

  button#navwich{
    margin-left: auto;
  }

  @media (min-width: 1000px){

    button#navwich{
      display: none;
    }

    ul.menu-main{
      position: sticky;
      top: 0px;
      /* background-color: blue; */
      flex-direction: row;
      position: initial;
      height: inherit !important;
      /* overflow: hidden !important; */
      opacity: 1;
      pointer-events: all;

      > a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex: 1;
        padding: 0 .1em;
      }
    }
  }
  
`