// note - tried to use styled components but something was overriding
import styles from "@styles/blocs/callout.module.css"
import { layout_breakout } from "@styles/layout.module.css"
import type { CSSProperties, ReactNode } from "react";
import React from "react"

type CalloutProps = {
	intent: "info" | "warning" | "error" | "success"
	content?: ReactNode
	children: ReactNode
	className?: string
  style?: CSSProperties
}

export function Callout({
	intent,
	content,
	className,
	children,
  style,
}: CalloutProps) {
	const cls = [
		styles.callout,
		styles[intent],
		className,
		layout_breakout,
	].join(" ")
	return (
		<div className={cls} style={style}>
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
