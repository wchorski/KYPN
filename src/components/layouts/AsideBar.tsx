import { page_sidebar } from "@styles/layout.module.css"
import type { CSSProperties, ReactNode } from "react"

type Props = {
	children: ReactNode
	aria_label: string
	maxWidth?: string
}

export function AsideBar({
	maxWidth = "300px",
	aria_label = "sidebar",
	children,
}: Props) {
	return (
		<aside
			className={page_sidebar}
			aria-label={aria_label}
			style={
				{
          //? moved to .page_layout component
					// "--sidebar-comp-max-width": maxWidth,
				} as CSSProperties
			}
		>
			{children}
		</aside>
	)
}
