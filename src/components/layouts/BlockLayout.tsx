import { GridLayout } from "@ks/types"
import type { CSSProperties, ReactNode } from "react"

type Props = {
	layout: GridLayout
	className?: string
	style?: CSSProperties
  children:ReactNode|ReactNode[]
  id?:string
  gap?:'s'|'m'|'l'
}

export function BlockLayout({ id, layout = "1_1", gap, className, style, children }: Props) {
	const clsNames = ["site-grid", `_${layout}`, className].join(" ")
	return (
		<div id={id} className={clsNames} style={{...style, gap: gap ? `var(--gap-${gap})` : '0'}}>
			{children}
		</div>
	)
}
