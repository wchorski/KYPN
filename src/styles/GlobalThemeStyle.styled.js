import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  /* @font-face {
    font-family: 'Exo', sans-serif;
    src: url('/assets/fonts/Exo-VariableFont_wght.ttf') format('ttf');
    font-weight: 900;
    font-style: normal;

  } */
  /* @font-face {
    font-family: 'Cousine';
    src: url('/assets/CousineRegularNerdFontComplete.ttf') format('ttf');
    font-weight: 100;
    font-style: normal;

  } */

  :root{
    --c-1: whitesmoke;
    --c-error: red;
    --c-accent: #858978;  /* accent */
    --c-light: #E8D0B7;  /* accent */
    --c-desaturated: #e2e2ed; /* desaturated primary */
    --c-primary: #E8B47C; /*  primary */
    --c-secondary: #aeacf1; /*  secondary contrast */
    --c-dark: #463b30; /* dark primary */
    /* --c-bg: hsl(271.24deg 4.13% 13.08%); */
    --c-bg: transparent;
    --c-body: whitesmoke;
    --c-bold: #563600;
    --c-label: white;
    --c-link: #977758;
    /* --c-bg: yellow; */
    --c-cont-light: 255, 255, 255;
    --c-cont-dark: 0, 0, 0;
    --c-txt: black;
    --c-txt-dark: black;
    --c-txt-light: white;
    --c-txt-primary: white; /* color that goes on top of primary color bg*/
    --c-txt-cont: white; /* color that's usually behind text */
    --c-txt-accent: black; /* color that goes on top of primary color bg*/
    --c-txt-rev: white;
    --c-edge: #e5e5e5;
    --c-disabled: #e1dcdc;
    --cg-primary: linear-gradient(0deg, var(--c-desaturated) 0%, var(--c-desaturated) 95%, var(--c-primary) 100%);
    --cg-dots: radial-gradient(#7272723b 20%, transparent 20%), radial-gradient(#fafafa2e 20%, transparent 20%);
    --cg-dots: radial-gradient(#7272723b 20%, transparent 20%), radial-gradient(#fafafa2e 20%, transparent 20%);
    --cg-stripes: repeating-linear-gradient(
        45deg,
        var(--c-disabled) 0px,
        var(--c-disabled) 10px,
        var(--c-desaturated) 10px,
        var(--c-desaturated) 20px
        
      );
    --c-glass: rgba(222, 222, 222, 0.774);

    --w-desktop: 1000px;
    --w-mobile: 600px;
    --w-tablet: 800px;
    --maxWidth: 1800px;
    --boxs-1: rgb(0 0 0 / 39%) 1px 1px 8px 0px;
    --boxs-2: rgb(0 0 0 / 81%) 1px 1px 2px 0px;
    --boxs-3: rgb(0 0 0 / 21%) 1px 1px 4px 0px;
    --br-sharp: 5px;
    --br-dull: 10px;
    --br-soft: 20px;
    --pad-article: 1rem;
    --pad-section: 1em;
  }

  html{
    box-sizing: border-box;
    font-size: 15px;
  }

  *, *:before, *:after{
    box-sizing: inherit;
  }

  body{
    /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
    /* font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
    /* font-family: var(--font-header), Ubuntu, sans-serif; */
    /* font-family: var(--font-exo); */
    /* font-weight: 900; */
    color: var(--c-txt);
    /* font-size: 1.5rem; */
    background-color: var(--c-body);
    /* line-height: 2; */
  }

  html, body{
    padding: 0;
    margin: 0;
    scroll-behavior: smooth;
    height: 100%;
  }

  #__next {
    height: 100%;
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
    background: var(--c-primary);  
    border-radius: 20px;
    z-index: 999999;
  }


  /* //? FONTS */
  h1, h2 {
    font-family: var(--font-header);
    font-weight: 900;
  }

  h3, h4, h5, h6{
    font-family: var(--font-sub);
    font-weight: 500;
  }

  caption {
    font-family: var(--font-sub);
    font-weight: bold;

  }

  p, span, a, td, strong, small{
    font-family: var(--font-paragraph);
    font-weight: 300;
  }

  p.excerpt{
    max-width: 65ch;
  }


  a{
    color: var(--c-link);
    transition: all .3s;

    &:hover, &:focus{ 
      color: var(--c-secondary);
    }

    &.button{
      background-color: var(--c-primary);
      color: var(--c-txt-rev);
      text-align: center;
      display: flex;
      align-items: center;
      text-decoration: none;
      border-radius: 1em;
      padding: 1em 2em;
      justify-content: center;
      border: solid 2px transparent;

      &:hover, &:focus{ 
        background-color: var(--c-txt-rev);
        border: solid 2px var(--c-secondary);
        color: var(--c-secondary);
      }

    }
  }

  a.title{
    text-decoration: none;
    color: var(--c-txt);

    &:hover, &:focus{
      color: var(--c-secondary);
    }
  }

  a, 
  button, 
  select,
  input {
    transition-property: color, background-color, border, text-shadow;
    transition-duration: .2s;
    transition-timing-function: ease-in;
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
      margin: 1em 0;
      padding: 1em 2em;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      color: var(--c-txt);
      border: solid 3px var(--c-primary);
      border-radius: var(--br-dull);
      transition-property: color, background, border;
      transition-duration: .1s;
      transition-timing-function: linear;
      text-decoration: none;
      
      &:hover, &:focus{
        color: var(--c-secondary);
        background-color: var(--c-desaturated);
        border: solid 3px var(--c-secondary);
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
    background-color: var(--c-primary);
    transition: all .3s;


    &:hover, &:focus{
      color: var(--c-txt-rev);
      background-color: var(--c-desaturated);
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

  /* //* INPUTS */
  input[type="search"]{
    padding: .3em 1em;
    position: relative;
  }

  input[type="number"] {
    padding: 3px;
    border: 1px solid #ccc;
    border-radius: var(--br-sharp);
    font-size: .7rem;
    outline: none;
  }

  /* Styling for the up/down arrow buttons */
  /* input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  } */

  /* Cross-browser styling for the up/down arrow buttons */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  /* Styling for when the input is focused */
  input[type="number"]:focus {
    border-color: var(--c-accent);
    box-shadow: var(--boxs-3);
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
    /* Adjust the size of the arrows */
    height: 8px;
    width: 8px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 50%;
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
    background-color: var(--c-txt-cont);
    padding: 1em;
    border-radius: 10px;
    box-shadow: var(--boxs-1);

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

  section.pad{
    padding-inline: var(--pad-section);
  }

  section.admin-panel{

    border: solid 2px var(--c-primary);
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
      background-color: var(--c-primary);
      color: var(--c-txt-rev);
    }
    
  }

  .display-none{
    display: none;
  }

  hr{
    width: 50%;
    margin-top: 3rem;
    margin-bottom: 3rem;
    /* mix-blend-mode: difference; */
    border: solid 2px var(--c-disabled);
  }

  header{
    display: block;
  }

  ul{
    list-style-image: url('/marker.svg');
  }

  li{
    line-height: normal;
    /* margin-bottom: .3em; */
    font-weight: 100;
  }

  ul.text li{
    margin-bottom: 1rem;
  }

  p{
    line-height: 2rem;
    font-weight: 100;
  }

  button {
    border: solid 1px var(--c-primary);
    border-radius: var(--br-sharp);
    background-color: var(--c-primary);
    color: var(--c-txt-primary);
    /* box-shadow: #00000052 -1px 1px 3px; */
    transition: all .3s;

    &:hover, &:focus{
      background-color: var(--c-txt);
      color: var(--c-secondary);
      border: solid 1px var(--c-secondary);
      /* box-shadow: #00000052 -1px 1px 4px; */
    }
    /* &:active{
      box-shadow: #00000052 0 0 0px;
    } */
  }

  figure.img-cont{

    /* width: 100%; */

    img{
      object-fit: contain;
      width: 100%;
      position: relative !important;
      height: unset !important;
    }
  }

  /* light gallery npm color fix */
  .lg-outer .lg-thumb-item.active, .lg-outer .lg-thumb-item:hover{
    border: solid var(--c-accent) 1px;
    border-bottom: solid var(--c-accent) 5px;
    transition: all .3s;
  }

  .maxwidth{
    max-width: var(--maxWidth);
    margin-inline: auto;
  }
`