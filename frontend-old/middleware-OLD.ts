import { NextRequest, NextResponse } from "next/server";
// cred- https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js

import { useMemo } from 'react'
import { cookies } from 'next/headers';
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

const API_URI = process.env.NEXT_PUBLIC_API_URI 

let sessionToken:string|undefined

export function middleware(req: NextRequest ){
  // console.log(req.nextUrl.pathname)
  const res = NextResponse.next({
    request: {
      headers: new Headers(req.headers)
    }
  })

  // console.log('** middleware')
  
  // const cookies = req.cookies.getAll()
  
  if(req.cookies.has('keystonejs-session')){
    const t = req.cookies.get('keystonejs-session')?.value
    // console.log({t})
    sessionToken = t
    
    
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set(`Authorization`, `Bearer ${t}`)
    requestHeaders.set(`middlewareheader`, `BROOOOOO`)
    requestHeaders.set(`Apollo-Require-Preflight`, `true`)
  }
  
  // console.log('>> ', Math.floor(Math.random() * 9), ' -- token')
  
  // req.headers.forEach(header => console.log('header ', header))

  return res
}

export function getSessionToken(req:NextRequest){

  if(req.cookies.has('keystonejs-session')){
    const token = req.cookies.get('keystonejs-session')?.value
    return token
    
  } else {
    console.log(' --- NO TOKEN SET --- ');
    return ''
  }
}

// export const config = {
//   matcher: '/'
// }

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient:any


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})



function createApolloClient() {

  console.log('middddd');
  
  // console.log({sessionToken, msg: 'create apollo client'});
  

  const httpLink = new HttpLink({
    uri: API_URI, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    headers: {
      Authorization: `Bearer ${''}` ,
      Chorski: `Bearer ${'no Will'}` 
    },
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client:any, pageProps:any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps:any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}