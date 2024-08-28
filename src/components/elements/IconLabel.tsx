import styles from "@styles/iconlabel.module.scss"
import { ReactNode } from "react"
type Props = {
	icon: ReactNode
  label:string
}

export function IconLabel({ icon, label }: Props) {
	return (
		<h2
			className={styles.icon_label}
			style={{
				fontSize: "var(--space-l)",
			}}
		>
			{icon} <span aria-hidden={false}>{label}</span>
		</h2>
	)
}
