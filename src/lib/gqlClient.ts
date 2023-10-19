import { HttpLink } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { envs } from "@/envs";
import { cookies } from "next/headers";

export const { getClient } = registerApolloClient(() => {

  const cookieStore = cookies()
  const cookieSession = cookieStore.get('keystonejs-session')
  const token = cookieSession?.value
  // todo figure out auth with server components
  // https://github.com/apollographql/apollo-client/pull/11275
  // console.log('cookieSession::::: ');
  console.log(`==== Bearer ${token}`);
  

  const client = new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: envs.API_URI,
      fetchOptions: {
        cache: "no-store",
        credentials: 'include',
      },
    }),
    credentials: 'include',
    headers: {
      // Authorization: 'Bearer Fe26.2**49fb088ba7fd509130877b5f917a01cf70e006f85d02c03d9e062ba1e7ff5351*vFndnreIEhKVPBuH7UT4cA*RHpA2PzfXdv7MJQrg5v1zyqSv8kAnBaqMc1-eb2yb_9aFxvYVITWv7bdtr9OeLYmVp662F4xY-JfvQvszWFWHH6VC9u1V8L_xPdv0vhUKz4*1699144136302*5a5219d760bc0040c3052cc4c656ec506d465c5f094892fc6d25f0d901d57ba2*43OKhMytaOgGdSXghm-s2PG9wO0lDdb9q8c2XhAudXg',
      'Authorization': (token) ? `Bearer ${token}`: "",
      "keep-alive": "true",
      "Apollo-Require-Preflight": "true",
      'Content-Type': 'application/json',
    },
  })

  // console.log(client, null, 2)

  return client
  
})