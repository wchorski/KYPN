import "@styles/globals.css"
import type { Metadata } from "next"
import { Inter, Barlow } from "next/font/google"
import Script from "next/script"
import { Nav } from "@components/private/Nav"
import { envs } from "@/envs"
// import { cookies } from "next/dist/client/components/headers"
import { Providers } from "./providers"
import { Footer } from "@components/private/Footer"
import { AnnouncementBanner } from "@components/elements/AnnouncementBanner"

const header_font = Inter({
	subsets: ["latin"],
  fallback: ['verdana', 'system-ui'],
	variable: "--font-header",
	preload: true,
})
const paragraph_font = Barlow({
	weight: ["300", "500", "800"],
	subsets: ["latin"],
  fallback: ['verdana', 'system-ui'],
	variable: "--font-paragraph",
	preload: true,
})

export const metadata: Metadata = {
	title: envs.SITE_TITLE,
	description: envs.SITE_DESC,
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
			{envs.UMAMI_ID && (
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
					{/* <div className="banner_wrap" >BANNER</div> */}

					{/* <header>empty_hero</header> */}
					<AnnouncementBanner />
					<Nav />

					{children}

					<Footer />
				</Providers>
			</body>
		</html>
	)
}
