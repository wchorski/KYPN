// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Page from "@/components/Page";
import dynamic from 'next/dynamic';
import { GlobalStyles } from "@/styles/GlobalThemeStyle.styled.js";
import { ApolloProvider } from "@apollo/client";

import '@/components/styles/nprogress.css'
import { GlobalContextProvider } from '@/lib/useSessionContext';
import { useApollo } from '@/lib/apolloClient';

// @ts-ignore
const ProgressBar = dynamic(() => import('components/ProgressBar'), { ssr: false });


function App({ Component, pageProps }:any) {
  const apolloClient = useApollo(pageProps)

  return (<>
    <GlobalStyles />

    <GlobalContextProvider>
      <ApolloProvider client={apolloClient}>
        <Page>
          <ProgressBar />
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </GlobalContextProvider>
  </>)
}

export default (App)