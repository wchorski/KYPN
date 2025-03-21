import { icon_label } from "@styles/iconlabel.module.css"
import type { ReactNode } from "react"
type Props = {
	icon: ReactNode
  label:string
  className?:string
}

export function IconLabel({ icon, label, className }: Props) {
	return (
		<h2
			className={[icon_label, className].join(' ')}
			style={{
				fontSize: "var(--space-l)",
			}}
		>
			{icon} <span aria-hidden={false}>{label}</span>
		</h2>
	)
}
