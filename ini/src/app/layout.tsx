import "@styles/globals.css"

import { ShoppingCart } from "@components/ecommerce/ShoppingCart"
import { AnnouncementBanner } from "@components/elements/AnnouncementBanner"
import { Footer } from "@components/private/Footer"
import { Nav } from "@components/private/Nav"
import type { Metadata } from "next"
import { Barlow, Inter } from "next/font/google"
import Script from "next/script"

import { envs } from "@/envs"

// import { cookies } from "next/dist/client/components/headers"
import { Providers } from "./providers"

const header_font = Inter({
	subsets: ["latin"],
	fallback: ["verdana", "system-ui"],
	variable: "--font-header",
	// https://github.com/vercel/next.js/discussions/45294
	preload: false,
})
const paragraph_font = Barlow({
	weight: ["300", "500", "800"],
	subsets: ["latin"],
	fallback: ["verdana", "system-ui"],
	variable: "--font-paragraph",
	preload: false,
})

export const metadata: Metadata = {
	title: envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// const cookieStore = cookies()
	// const sessionObj = cookieStore.get("keystonejs-session")
	// const token = sessionObj?.value

	return (
		<html lang="en">
			{envs.UMAMI_ID && envs.NODE_ENV === "production" && (
				<Script
					id="umami-next"
					strategy="afterInteractive"
					async
					data-website-id={envs.UMAMI_ID}
					src={`/stts/${envs.UMAMI_SCRIPT}`}
				/>
			)}

			<body
				className={[
					header_font.variable,
					paragraph_font.variable,
					"layout--fullwidth",
				].join(" ")}
			>
				<Providers>
					<ShoppingCart />

					<AnnouncementBanner />
					<Nav />

					{children}

					<Footer />
				</Providers>
			</body>
		</html>
	)
}
