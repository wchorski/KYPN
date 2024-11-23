import { CSSProperties, ReactNode } from "react"
import { card } from "@styles/card.module.scss"
import {
	bg_c_accent,
	bg_c_plain,
	bg_c_primary,
	bg_c_reverse_theme,
	bg_c_secondary,
	bg_c_tertiary,
	bg_c_transparent,
} from "@styles/colorthemes.module.css"
import { ColorsTheme, SpaceSize } from "@ks/types"
import { getColorTheme } from "@lib/styleHelpers"

type Props = {
	children: ReactNode
	content?: string
	layout?: "flex" | "grid"
	direction?: "row" | "column"
	id?: string
	colorTheme?: ColorsTheme
	// backgroundColor?: string
	className?: string
	style?: CSSProperties
	gap?: string
	wrapperOverflow?: SpaceSize
	paddingBlock?: SpaceSize
	margin?: SpaceSize
	verticleAlign?: "start" | "center" | "end"
	maxWidth?: string
	// layout?: 'default'|'center',
}

export function Card({
	layout = "flex",
	direction = "column",
	children,
	content,
	id,
	colorTheme = "bg_c_plain",
	className,
	style,
	gap = "var(--space-m)",
	wrapperOverflow,
	paddingBlock,
	margin,
	verticleAlign,
	maxWidth,
}: Props) {
	const clrTheme = getColorTheme(colorTheme)

	const clsnms = ['card', card, clrTheme, className].join(" ")

	return (
		<div
			id={id}
			className={clsnms}
			style={{
				// ...(backgroundColor ? {backgroundColor: backgroundColor} : {}),
				flexDirection: direction,
				gap: gap,
				...(margin ? { margin: margin } : {}),
				...(verticleAlign ? { alignSelf: verticleAlign } : {}),
				paddingInline: wrapperOverflow
					? `var(--space-${wrapperOverflow})`
					: "var(--space-m)",
				...(paddingBlock
					? { paddingBlock: `var(--space-${paddingBlock})` }
					: {}),
				...(maxWidth ? { maxWidth } : {}),
				// ...(isPopOut ? {marginInline: 'clamp(calc(var(--space-m) * -1)'} : {}),
				// ...(wrapperOverflow ? {'--space-wrapperOverflow': `var(--space-${wrapperOverflow})`} : {}),
				// marginInline: isPopOut ? 'calc(var(--space-m) * -1)' : 'revert-layer',
				...style,
			}}
		>
			{content && <>{content}</>}
			{children}
		</div>
	)
}
