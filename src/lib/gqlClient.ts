// import { ApolloClient, createHttpLink, HttpLink, InMemoryCache } from "@apollo/client";
// import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
// // import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
// // cred - https://www.apollographql.com/docs/react/networking/authentication
// const link = createHttpLink({
//   uri: `${envs.CMS_URL}/api/graphql`,
//   credentials: "include",
// })
// export const { getClient } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link,
//   });
// });
// export const apollo = getClient();
// cred - https://github.com/apollographql/apollo-client-nextjs
// cred - https://github.com/apollographql/apollo-client-nextjs/issues/373
//! i've given up on trying to make apollo client work
import { createHttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/experimental-nextjs-app-support";

import { envs } from "@/envs";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const httpLink = () => {
    // const readOnlyHeaders = headers();
    // const authorization = readOnlyHeaders.get('Authorization');
    // if (!authorization) {
    //   throw new Error('Missing authorization header');
    // }
    return createHttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: `${envs.CMS_URL}/api/graphql`,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      fetchOptions: { cache: "no-store" },
      credentials: 'include',
      // headers: {
      //   authorization,
      // },
    });
  };
  return new ApolloClient({
    link: httpLink(),
    cache: new InMemoryCache(),
    credentials: 'include'
  });
});