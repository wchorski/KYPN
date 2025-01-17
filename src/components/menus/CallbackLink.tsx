"use client"
import { envs } from "@/envs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ReactNode } from "react"

type Props = {
	href?: string
	baseURL?: string
	children: ReactNode
}

export function CallbackLink({ href = "/login", baseURL, children }: Props) {
	const pathName = usePathname()

	const withBaseUrl = (baseURL || envs.FRONTEND_URL) + pathName

	return <Link href={`${href}?callbackUrl=${withBaseUrl}`}>{children}</Link>
}
