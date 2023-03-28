// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Page from "@/components/Page";
import dynamic from 'next/dynamic';
import { GlobalStyles } from "@/styles/GlobalThemeStyle.styled.js";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from "apollo-link-context";


import '@/components/styles/nprogress.css'
// import withData from '../lib/withData'
// @ts-ignore
const ProgressBar = dynamic(() => import('components/ProgressBar'), { ssr: false });


const API_URI = process.env.NEXT_PUBLIC_API_URI 
// const client = new ApolloClient({
//   uri: API_URI,
//   cache: new InMemoryCache(),
//   link: createUploadLink({
//     uri: API_URI
//   })
// })

const middlewareUpdate = createUploadLink({ uri: API_URI });
const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      'Apollo-Require-Preflight': 'true'
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(middlewareUpdate),
  
  fetchOptions: {
    mode: "no-cors",
  },
});


function App({ Component, pageProps }: AppProps) {


  return (<>
    <GlobalStyles />

    <ApolloProvider client={client}>
      <Page>
        <ProgressBar />
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>


  </>)
}

export default App;