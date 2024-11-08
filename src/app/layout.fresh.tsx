import "@styles/globals.scss"
import Script from "next/script"
import type { Metadata } from "next"
import { Inter, Barlow } from "next/font/google"
import { Nav } from "@components/private/Nav"
import { envs } from "@/envs"
import { cookies } from "next/dist/client/components/headers"
import { Providers } from "./providers"

import { Footer } from "@components/private/Footer"
// import { AnnouncementBanner } from '@components/elements/AnnouncementBanner'

const header_font = Inter({ subsets: ["latin"], variable: "--font-header" })
const paragraph_font = Barlow({
	weight: ['300', '500', '800'],
	subsets: ["latin"],
	variable: "--font-paragraph",
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
  const cookieStore = cookies()
	const sessionObj = cookieStore.get("keystonejs-session")
	const token = sessionObj?.value


	return (
		<html lang="en">
    

			<body

			>

          
        {/* <div className="banner_wrap" >BANNER</div> */}

        {/* <header>empty_hero</header> */}

				<Nav />

				{children}

        <Footer />

			</body>
		</html>
	)
}
