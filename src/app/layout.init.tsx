import '@styles/globals.scss'
import type { Metadata } from 'next'
import { Inter, Barlow } from 'next/font/google'
import layoutStyles from '@styles/layout.module.scss'
import Script from 'next/script'
import { Nav } from '@components/private/Nav'
import {Footer} from '@components/private/Footer'
import { envs } from '@/envs'
// import { ApolloWrapper } from './ApolloWrapper'
// import ShoppingCart from '@components/ecommerce/ShoppingCart'
import { Hero } from '@components/private/Hero'
// import { AsideBar } from '@components/layouts/AsideBar'
import { cookies } from 'next/dist/client/components/headers'
import { Providers } from './providers'
import ShoppingCart from '@components/ecommerce/ShoppingCart'
import { AnnouncementBanner } from '@components/elements/AnnouncementBanner'

const header = Inter({ subsets: ['latin'], variable: '--font-header' })
const paragraph = Barlow({ weight: '200', subsets: ['latin'], variable: '--font-paragraph' })

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
  const sessionObj = cookieStore.get('keystonejs-session')
  const token = sessionObj?.value
  

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

      <body className={[
        header.variable, 
        paragraph.variable, 
        'layout--fullwidth',
        'layout'
        // 'layout--main-aside',
      ].join(' ')}>
      <Providers>

        <ShoppingCart />

        <AnnouncementBanner />
        
        <Hero
          title={envs.SITE_TITLE}
          description={envs.SITE_DESC}
          logoSrc={`/assets/logo.png`}
          bgImg={'/assets/tiles/teal-restaurant.webp'}
        >
        </Hero>
        
        <Nav />
      
        {children}


        {/* //? if you want a global sidebar */}
        {/* <AsideBar>
          <Card> 
            <h3> one </h3>
            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum deleniti perferendis nesciunt suscipit inventore id, eos, est debitis cum fugit dolores aliquid, magnam ad veritatis quidem quia expedita! Provident, quas.</p>
          </Card>
          <Card> 
            <h3> one </h3>
            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum deleniti perferendis nesciunt suscipit inventore id, eos, est debitis cum fugit dolores aliquid, magnam ad veritatis quidem quia expedita! Provident, quas.</p>
          </Card>
          <Card> 
            <h3> one </h3>
            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum deleniti perferendis nesciunt suscipit inventore id, eos, est debitis cum fugit dolores aliquid, magnam ad veritatis quidem quia expedita! Provident, quas.</p>
          </Card>
        </AsideBar> */}



        <Footer />
        
      </Providers>
      </body>
    </html>
  )
}
