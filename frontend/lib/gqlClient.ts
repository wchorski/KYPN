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
  console.log(':::::::::::new::::::::::::::');
  console.log('cookieSession::::: ');
  // console.log({cookieSession});
  console.log(`==== Bearer ${cookieSession?.value}`);
  
  

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: envs.API_URI,
    }),
    headers: {
      'Authorization': (cookieSession) ? `Bearer ${cookieSession?.value}`: "",
      'Content-Type': 'application/json'
    },
  });
});