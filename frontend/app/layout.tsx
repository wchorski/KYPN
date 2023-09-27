import './globals.scss'
import type { Metadata } from 'next'
import { Inter, Barlow } from 'next/font/google'
import layoutStyles from '@styles/layout.module.scss'

import { Nav } from '@components/menus/Nav'
import {Footer} from '@components/menus/Footer'
import { envs } from '@/envs'
import { ApolloWrapper } from './ApolloWrapper'
import ShoppingCart from '@components/ecommerce/ShoppingCart'
// import { AsideBar } from '@/components/layouts/AsideBar'

const header = Inter({ subsets: ['latin'], variable: '--font-header' })
const paragraph = Barlow({ weight: '200', subsets: ['latin'], variable: '--font-paragraph' })

export const metadata: Metadata = {
  title: envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={[
        header.variable, 
        paragraph.variable, 
        'layout--fullwidth',
        // 'layout--main-aside',
      ].join(' ')}>

      <ApolloWrapper>

        <ShoppingCart />
        
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
        
      </ApolloWrapper>
      </body>
    </html>
  )
}
