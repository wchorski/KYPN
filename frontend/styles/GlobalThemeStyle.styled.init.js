import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;

  }

  :root{
    --c-1: whitesmoke;
    --c-error: red;
    --c-accent: #a1d7e2;  /* accent */
    --c-2: #d7e2a1; /* desaturated */
    --c-3: #8baf72; /* contrast */
    --c-dark: #4b4f4c; /* dark */
    --c-bg: #eff6f4;
    --c-cont-light: 255, 255, 255;
    --c-cont-dark: 0, 0, 0;
    --c-txt: #140611;
    --c-txt-rev: white;
    --c-edge: #e5e5e5;
    --cg-dots: radial-gradient(#7272723b 20%, transparent 20%), radial-gradient(#fafafa2e 20%, transparent 20%);
    --c-disabled: gray;


    --maxWidth: 1800px;
    --boxs-1: rgb(0 0 0 / 39%) 1px 1px 8px 0px;
    --br-sharp: 5px;
    --br-dull: 10px;
    --br-soft: 20px;
  }

  html{
    box-sizing: border-box;
    font-size: 14px;
  }

  *, *:before, *:after{
    box-sizing: inherit;
  }

  body{
    /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
    /* font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
    font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.5rem;
    line-height: 2;
  }

  html, body{
    padding: 0;
    margin: 0;
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar { 
    background: transparent;
    width: 10px;
    height: 10px;
    z-index: 999999;
  }  
    
  ::-webkit-scrollbar-track { 
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    z-index: 999999;
  }  
    
  ::-webkit-scrollbar-thumb {  
    background: var(--c-3);  
    border-radius: 20px;
    z-index: 999999;
  }

  a{
    color: var(--c-accent);
    transition: all .3s;

    &.button{
      background-color: var(--c-3);
      color: var(--c-txt-rev);
      text-align: center;
      display: flex;
      align-items: center;
      text-decoration: none;
      border-radius: 1em;
      padding: 1em 2em;
      justify-content: center;
    }
  }

  a:hover{ 
    background-color: var(--c-2);
    color: var(--c-txt);
  }

  a, 
  button, 
  select,
  input {
    transition: background-color, color, border .3s ;
    cursor: pointer;
  }

  [data-tooltip]{
    &::before{
      --scale: 0;
      content: attr(data-tooltip);
      position: absolute;
      top: -.25rem;
      left: 50%;
      height: 25px;
      background-color: var(--c-txt);
      color: var(--c-txt-rev);
      transform: translate(-50%, -100%) scale(var(--scale));
      padding: .5rem;
      width: max-content;
      max-width: 100%;
      border-radius: .3rem;
      text-align: center;
      transition: transform ease-in .1s 1s;
    }

    &:hover::before, &:focus::before{
      --scale: 1;
      transform: translate(-50%, -100%) scale(var(--scale));
    }
  }

  button, a{
    
    
    &.medium{
      padding: 1em 2em;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      color: var(--c-3);
      border: solid 3px var(--c-3);
      border-radius: var(--br-dull);
      transition-property: color, background, border;
      transition-duration: .1s;
      transition-timing-function: linear;
      text-decoration: none;
      
      &:hover, &:focus{
        color: var(--c-txt-rev);
        background-color: var(--c-3);
        border: solid 3px var(--c-accent);
        border-radius: var(--br-dull);
      }


      svg{
        margin-right: .3em;
      }
    }
  }

  button.edit{
    position: relative;
    border-radius: 50px;
    padding: .1em;
    border: none;
    margin-right: -2rem;
    margin-left: 1rem;
    background-color: var(--c-3);
    transition: all .3s;


    &:hover, &:focus{
      color: var(--c-txt-rev);
      box-shadow: black 1px 1px 1px;
      transform: translateY(-2px);
    }

    svg{
      font-size: 3rem;
    }
  }

  button.delete{
    background-color: var(--c-error);
    color: white;

    &:hover, &:focus{
      background-color: white;
      color: var(--c-error);
      border: solid red 2px;
    }
  }

  button, select, input{
    &:is([disabled]){
      background-color: var(--c-disabled);
      color: var(--c-txt-rev);
      border: none;
      cursor: not-allowed;

      &:hover{
        background-color: var(--c-disabled);
        border: none;
      }
    }
  }

  input[type="search"]{
    padding: .3em 1em;
    position: relative;
  }

  label{
    position: relative;
  }

  label:has(input[type="search"]) svg{
    position: absolute;
    top: 25%;
    right: 0;
    pointer-events: none;
  }
  label:has(input[type="search"]:focus) svg{
    position: absolute;
    top: 25%;
    right: 0;
    opacity: 0;
  }

  nav{
    ul{
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }

  .card{
    background-color: var(--c-3);
    padding: 1em;
    border-radius: 10px;
    box-shadow: black 1px 1px 3px 0px;

    &.call-to-action{

      display: flex;
      justify-content: space-between;
      align-items: center;

      button{
        border-radius: 5em;
        padding: 0 2em;
        height: 40px;
      }
    }
  }

  section.admin-panel{

    border: solid 2px var(--c-3);
    /* padding: 1em; */
    border-radius: 5px;
    margin-bottom: 1em;

    > * {
      margin-left: 1em;
      margin-right: 1em;
    }

    > h2 {
      margin: 0;
      margin-bottom: 1em;
      padding: 0 1em;
      background-color: var(--c-3);
      color: var(--c-txt-rev);
    }
    
  }

  .display-none{
    display: none;
  }

  hr{
    width: 25%;
    border: solid 1px rgb(0 0 0 / 10%);
    margin-bottom: 1em;
  }

`