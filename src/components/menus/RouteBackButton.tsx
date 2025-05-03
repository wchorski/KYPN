"use client"
import { useRouter } from "next/navigation"
import type { CSSProperties, ReactNode } from "react"

type Props = {
	children: ReactNode
  style?: CSSProperties
}

export default function RouteBackButton({ style, children }: Props) {
	const router = useRouter()
	return <button onClick={router.back} style={style}>{children}</button>
}
