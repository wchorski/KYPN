import React, { CSSProperties, ReactNode } from "react"
import styles from "@styles/blocs/hero.module.scss"

type HeroProps = {
	imageSrc: string
	caption:
		| {
				discriminant: false
		  }
		| {
				discriminant: true
				value: React.ReactNode
		  }
	children?: ReactNode
	color?: string
}

export function Hero({ imageSrc, caption, color, children }: HeroProps) {

	const inlineStyle = {
		backgroundImage: `url(${imageSrc})`,
		"--color-header": color,
		"--color-content": color,
	} as CSSProperties

	return (
		<div className={styles.hero + " width-wide"} style={inlineStyle}>
			{/* <div
				className={styles.backgroundImage + ' width-wide'}
				style={{ backgroundImage: `url(${imageSrc})` }}
			/> */}
			{children}
			{caption.discriminant ? (
				<div style={{ textAlign: "center" }}>{caption.value}</div>
			) : null}
		</div>
	)
}
