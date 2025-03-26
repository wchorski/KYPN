import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { CustomNavigation } from "./CustomNavigation"
import type { NavigationProps } from '@keystone-6/core/admin-ui/components';

type Props = {
  children:ReactNode
}

export function KSProviders ({ authenticatedItem, lists }: NavigationProps) {
  return (
    <SessionProvider>
      <CustomNavigation authenticatedItem={authenticatedItem} lists={lists}/>
    </SessionProvider>
  )
}