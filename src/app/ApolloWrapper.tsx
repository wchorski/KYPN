"use client";
// ^ this file needs the "use client" pragma
// https://github.com/apollographql/apollo-client-nextjs

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { envs } from "@/envs";
import { useRef } from "react";

// have a function to create a client for you
function makeClient(token:string|undefined) {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: envs.API_URI,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      "keep-alive": "true",
      "Apollo-Require-Preflight": "true"
    },
    credentials: 'include',
    // pass the headers along from this request. This enables SSR with logged in state
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: {
      cache: "no-store",
      credentials: 'include',
    },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  return new NextSSRApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ token, children }: React.PropsWithChildren<{
  token: string | undefined;
}>) {

  const tokenRef = useRef<string|undefined>()
  tokenRef.current = token

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(tokenRef.current)} >
      {children}
    </ApolloNextAppProvider>
  );
}