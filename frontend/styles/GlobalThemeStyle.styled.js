import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;

  }

  :root{
    --c-1: #a3cf03;  /* accent */
    --c-2: #7aa976; /* desaturated */
    --c-3: #6c8157; /* contrast */
    --c-bg: #f9faf5;
    --c-txt: black;
    --c-txt-rev: white;
    --c-edge: #e5e5e5;
    --cg-dots: radial-gradient(#7272723b 20%, transparent 20%), radial-gradient(#fafafa2e 20%, transparent 20%);
    --c-disabled: gray;

    --maxWidth: 1000px;
    --boxs-1: rgb(0 0 0 / 39%) 1px 1px 8px 0px;
    --br-1: 5px;
    --br-2: 10px;
    --br-3: 20px;
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
    background: var(--c-1);  
    border-radius: 20px;
    z-index: 999999;
  }

  a{
    color: var(--c-1);
    transition: all .3s;
  }

  a:hover{ 
    opacity: .7;
  }

  a, button{cursor: pointer;}

  button{
    font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

`