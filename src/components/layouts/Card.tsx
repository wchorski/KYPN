import { CSSProperties, ReactNode } from "react"
import { card } from "@styles/card.module.scss"
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
	// margin?: SpaceSize
	marginBlock?: string
	marginInline?: string
	verticleAlign?: "start" | "center" | "end"
	maxWidth?: string
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
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
  // TODO could make a `if gap is 3 chars or less slot it into var(--space-GAP)` to support ridged and custom values
	gap = "var(--space-0)",
	wrapperOverflow,
	paddingBlock,
	marginBlock,
	marginInline,
	verticleAlign,
	maxWidth,
  justifyContent,
  alignItems,
}: Props) {
	const clrTheme = getColorTheme(colorTheme)

	const clsnms = ["card", card, clrTheme, className].join(" ")

	return (
		<div
			id={id}
			className={clsnms}
			style={{
				// ...(backgroundColor ? {backgroundColor: backgroundColor} : {}),
				flexDirection: direction,
        justifyContent,
        alignItems,
				gap: gap,
				...(marginBlock ? { marginBlock } : {}),
				...(marginInline ? { marginInline } : {}),
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
