'use client'
// cred Ethan - https://www.youtube.com/watch?v=2kgqPvs0j_I

import { SessionProvider } from 'next-auth/react'

type Props = {
  children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}