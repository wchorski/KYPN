// note - tried to use styled components but something was overriding
import React, { ReactNode } from "react"
import styles from "@styles/blocs/callout.module.css"
import { layout_breakout } from "@styles/layout.module.css"

type CalloutProps = {
	intent: "info" | "warning" | "error" | "success"
	content?: ReactNode
	children: ReactNode
	className?: string
}

export function Callout({
	intent,
	content,
	className,
	children,
}: CalloutProps) {
	const cls = [
		styles.callout,
		styles[intent],
		className,
		layout_breakout,
	].join(" ")
	return (
		<div className={cls}>
			<aside>
				<i className={styles.icon} />
			</aside>
			<div className={styles.content}>
				{content}
				{children}
			</div>
		</div>
	)
}
