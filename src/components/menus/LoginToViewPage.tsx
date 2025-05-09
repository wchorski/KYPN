import { IconPadLock } from "@lib/useIcons"
import { page_content, page_layout } from "@styles/layout.module.css"
import type { ReactNode } from "react"

import { CallbackLink } from "./CallbackLink"

type Props = {
	children?: ReactNode | ReactNode[]
}

export function LoginToViewPage({ children }: Props) {
	return (
		<main className={page_layout}>
			<header></header>
			<div className={page_content}>
				<p style={{ fontSize: "2rem" }}>
					<IconPadLock />
				</p>

				<p>
					<CallbackLink>Login</CallbackLink> to view page
				</p>
				{children}
			</div>
		</main>
	)
}
