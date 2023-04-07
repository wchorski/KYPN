// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Page from "../components/Page";
import dynamic from 'next/dynamic';
import { GlobalStyles } from "../styles/GlobalThemeStyle.styled.js";
import { ApolloProvider } from "@apollo/client";

import '../styles/nprogress.css'
import { GlobalContextProvider } from '../lib/useSessionContext';
import { useApollo } from '../lib/apolloClient';
import { CartStateProvider } from '../lib/cartState';

// @ts-ignore
const ProgressBar = dynamic(() => import('components/ProgressBar'), { ssr: false });


function App({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps)

  return (<>
    <GlobalStyles />

    <GlobalContextProvider>
      <ApolloProvider client={apolloClient}>
        <CartStateProvider>
          <Page>
            <ProgressBar />
            <Component {...pageProps} />
          </Page>
        </CartStateProvider>
      </ApolloProvider>
    </GlobalContextProvider>
  </>)
}

export default (App)