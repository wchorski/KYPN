'use client';

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
} from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import React from 'react';

const uri = process.env.NEXT_PUBLIC_HASURA_URL;

function createClient(token: string | undefined) {
  const httpLink = new HttpLink({
    uri,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {
          'x-hasura-admin-secret': 'myadminsecretkey',
        },
  });

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({
  children,
  token,
}: React.PropsWithChildren<{
  token: string | undefined;
}>) {
  const makeClient = React.useCallback(() => createClient(token), [token]);

  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}