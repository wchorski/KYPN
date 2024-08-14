import { CSSProperties, ReactNode } from "react"
import styles from "@styles/card.module.scss"
import { SpaceSize } from "@ks/types"

type Props = {
	children: ReactNode
	layout?: "flex" | "grid"
	direction?: "row" | "column"
	id?: string
	bgColor?: string
	className?: string
	style?: CSSProperties
	gap?: string
	wrapperOverflow?: SpaceSize
  paddingBlock?: SpaceSize
	// layout?: 'default'|'center',
}

export function Card({
	layout,
	direction = "column",
	children,
	id,
	bgColor,
	className,
	style,
	gap = "var(--space-m)",
	wrapperOverflow,
  paddingBlock
}: Props) {
	const allStyles = ["card", styles.card, styles[layout || ""]].join(" ")

	return (
		<div
			id={id}
			className={allStyles + " " + className}
			style={{
        backgroundColor: bgColor,
				flexDirection: direction,
				gap: gap,
        paddingInline: wrapperOverflow ? `var(--space-${wrapperOverflow})` : 'var(--space-m)',
        ...(paddingBlock ? {paddingBlock: `var(--space-${paddingBlock})`} : {}),
        // ...(isPopOut ? {marginInline: 'clamp(calc(var(--space-m) * -1)'} : {}),
        // ...(wrapperOverflow ? {'--space-wrapperOverflow': `var(--space-${wrapperOverflow})`} : {}),
        // marginInline: isPopOut ? 'calc(var(--space-m) * -1)' : 'revert-layer',
				...style,
			}}
		>
			{children}
		</div>
	)
}
