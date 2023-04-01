// cred- https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js

import { useMemo } from 'react'
import { cookies } from 'next/headers';
import { ApolloClient, HttpLink, InMemoryCache, from, createHttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { createUploadLink } from 'apollo-upload-client';

const API_URI = process.env.NEXT_PUBLIC_API_URI 

let sessionToken:string|undefined


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

  // console.log({sessionToken})
  // const [sessionState, setSession] = useLocalStorage('session', '{"sessiontoken": "no-token"}')

  // let  session:any = {sessionToken: '{"sessiontoken": "no-token"}'}

  // if(sessionState){
  //   // @ts-ignore
  //   console.log(JSON.parse(sessionState));
    
  //   // @ts-ignore
  //   session = JSON.parse(sessionState)
  //   console.log(session.sessionToken)

  // }
  

  const httpLink = createHttpLink({
    uri: API_URI, // Server URL (must be absolute)
    credentials: 'include', // credentials: 'same-origin' if your backend server is the same domain, as shown below, or else credentials: 'include' if your backend is a different domain.
    // headers: {
    //   Authorization: `Bearer ${session.sessionToken}` , //TODO !!!!!! GET SESSION TOKEN HERE
    //   Chorski: `Bearer ${'no Will'}` 
    // },
  })

  const uploadLink = createUploadLink({
    uri: API_URI, 
    fetchOptions: {
      credentials: 'include',
    },
    // pass the headers along from this request. This enables SSR with logged in state
    // headers,
  })
  

  // const httpLink = createHttpLink({
  //   useGETForQueries: true,
  //   uri: API_URI,
  //   credentials: 'include'
  // })

  // const authLink = setContext((_, { headers }) => {
  //   const session = localStorage.getItem("session")
  //   console.log({session});
    
  //   //@ts-ignore
  //   const token = JSON.parse(session).sessionToken
  //   console.log({token})
    
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : "",
  //     },
  //   };
  // });



  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([
      errorLink, 
      httpLink, 
      // uploadLink //TODO FIX FILE UPLOAD WITH APOLLO
    ]),
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