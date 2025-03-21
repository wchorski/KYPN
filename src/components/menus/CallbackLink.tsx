"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ReactNode } from "react"

import { envs } from "@/envs"

type Props = {
	href?: string
	baseURL?: string
	children: ReactNode
  className?:string
} 

export function CallbackLink({ href = "/login", baseURL, children, className }: Props) {
	const pathName = usePathname()

	const withBaseUrl = (baseURL || envs.FRONTEND_URL) + pathName

	return <Link href={`${href}?callbackUrl=${withBaseUrl}`} className={className}>{children}</Link>
}
