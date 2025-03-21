"use client"
// cred - github.com/apollographql/apollo-client-nextjs/issues/281#issuecomment-2057927433
//! given up on using client and just using NextJS's api to pass query and variable as json
// ^ this file needs the "use client" pragma
import { HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import {
	ApolloClient,
	ApolloNextAppProvider,
	InMemoryCache,
} from "@apollo/experimental-nextjs-app-support"

import { envs } from "@/envs"

import { useCookies } from "./CookieContext"

// have a function to create a client for you
function makeClient() {
	const { cookie } = useCookies()

	const authLink = setContext((_, { headers }) => {
		// const token = localStorage.getItem("token")

		return {
			headers: {
				...headers,

				authorization: cookie ? `Bearer ${cookie}` : "",
			},
		}
	})

	const httpLink = new HttpLink({
		// this needs to be an absolute url, as relative urls cannot be used in SSR
		uri: `${envs.CMS_URL}/api/graphql`,
		// you can disable result caching here if you want to
		// (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
		fetchOptions: { cache: "no-store" },
		// you can override the default `fetchOptions` on a per query basis
		// via the `context` property on the options passed as a second argument
		// to an Apollo Client data fetching hook, e.g.:
		// const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
		credentials: "include",
	})

	// use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
	return new ApolloClient({
		// use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
		cache: new InMemoryCache(),
		link: authLink.concat(httpLink),
	})
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
	const myCookies = document.cookie
	console.log({myCookies})
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	)
}
