'use client'
import { CartStateProvider } from '@components/context/CartStateContext'
// cred Ethan - https://www.youtube.com/watch?v=2kgqPvs0j_I

import { SessionProvider } from 'next-auth/react'

type Props = {
  children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <CartStateProvider>
        {children}
      </CartStateProvider>
    </SessionProvider>
  )
}