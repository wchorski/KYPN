// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Page from "@/components/Page";
import { createGlobalStyle } from "styled-components";
import dynamic from 'next/dynamic';
import { ApolloProvider } from "@apollo/client";

import '@/components/styles/nprogress.css'
// import withData from '../lib/withData'
// @ts-ignore
const ProgressBar = dynamic(() => import('components/ProgressBar'), { ssr: false });



const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;

  }

  :root{
    --c-1: orange;
    --c-2: orangered;
    --c-3: darkred;
    --c-bg: #454545;

    --maxWidth: 1300px;
    --box-shadow: '0 12px 24px 0 rgba(0,0,0, .09)'

  }

  html{
    box-sizing: border-box;
    
  }

  *, *:before, *:after{
    box-sizing: inherit;
  }

  body{
    /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
    font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

  a{
    color: var(--c-1);
    transition: opacity, color 1s;
  }

  a:hover{ 
    opacity: .7;
  }

  button{
    font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

function App({ Component, pageProps }: AppProps) {

  return (<>
    <GlobalStyles />


      <Page>
        <ProgressBar />
        <Component {...pageProps} />
      </Page>


  </>)
}

export default App;