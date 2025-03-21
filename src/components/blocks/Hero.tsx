import styles from "@styles/blocs/hero.module.css"
import sLayout from "@styles/layout.module.css"
import type { CSSProperties, ReactNode } from "react";
import React from "react"

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

  const cls = [styles.hero, sLayout.layout_wide].join(' ')
	const inlineStyle = {
		backgroundImage: `url(${imageSrc})`,
		"--color-header": color,
		"--color-content": color,
    ...(color ? {color} : {})
	} as CSSProperties

	return (
		<div className={cls} style={inlineStyle}>
			{/* <div
				className={styles.backgroundImage + ' layout-wide'}
				style={{ backgroundImage: `url(${imageSrc})` }}
			/> */}
			{children}
			{caption.discriminant ? (
				<div style={{ textAlign: "center" }}>{caption.value}</div>
			) : null}
		</div>
	)
}
