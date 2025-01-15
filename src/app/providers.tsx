"use client"
import { CartStateProvider } from "@components/hooks/CartStateContext"
import { GlobalContextProvider } from "@hooks/useGlobalContext"
// cred Ethan - https://www.youtube.com/watch?v=2kgqPvs0j_I

import { SessionProvider } from "next-auth/react"

type Props = {
	children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
	return (
		<SessionProvider>
			<GlobalContextProvider>
				<CartStateProvider>{children}</CartStateProvider>
			</GlobalContextProvider>
		</SessionProvider>
	)
}
