"use client"

// import { useUrlHash } from "@hooks/useUrlHash"
// import { dashlink, linkactive } from "@styles/menus/dashboard.module.css"
import type { ReactNode } from "react"

type Props = {
	slug: string
	text?: string
	icon: ReactNode
	onClick: (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		slug: string
	) => any
}

export function DashNavLink({ slug, text, icon, onClick }: Props) {
	// const { hash, setHash, removeHash } = useUrlHash()

	return (
		<a
			href={`#${slug}`}
			// className={hash === slug ? linkactive : dashlink}
			onClick={(e) => onClick(e, slug)}
		>
			<span>{text || slug}</span> {icon}
		</a>
	)
}
