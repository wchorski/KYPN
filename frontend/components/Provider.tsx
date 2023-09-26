'use client'
import { useApollo } from '@lib/apolloClient';
import { CartStateProvider } from '@lib/cartState';
import { GlobalContextProvider } from '@lib/useGlobalContext';
import { ApolloProvider } from "@apollo/client";

// @ts-ignore
const ProgressBar = dynamic(() => import('@components/ProgressBar'), { ssr: false });

export function Providers({ children }: { children: React.ReactNode }) {

  const apolloClient = useApollo(pageProps)
  
  return (
    <GlobalContextProvider>
      <ApolloProvider client={apolloClient}>
        <CartStateProvider>
          <ProgressBar />

          {children}


        </CartStateProvider>
      </ApolloProvider>
    </GlobalContextProvider>
  );
}