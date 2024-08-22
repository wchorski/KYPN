import { CSSProperties, ReactNode } from "react"
import styles from "@styles/card.module.scss"
import { SpaceSize } from "@ks/types"

type Props = {
	children: ReactNode
	content?:string,
	layout?: "flex" | "grid"
	direction?: "row" | "column"
	id?: string
	bgColor?: string
	className?: string
	style?: CSSProperties
	gap?: string
	wrapperOverflow?: SpaceSize
  paddingBlock?: SpaceSize
  margin?: SpaceSize
  verticleAlign?: 'start'|'center'|'end',
  maxWidth?:string,
	// layout?: 'default'|'center',
}

export function Card({
	layout,
	direction = "column",
	children,
  content,
	id,
	bgColor,
	className,
	style,
	gap = "var(--space-m)",
	wrapperOverflow,
  paddingBlock,
  margin,
  verticleAlign,
  maxWidth
}: Props) {
	const allStyles = ["card", styles.card, styles[layout || ""]].join(" ")

	return (
		<div
			id={id}
			className={allStyles + " " + className}
			style={{
        ...(bgColor ? {backgroundColor: bgColor} : {}),
				flexDirection: direction,
				gap: gap,
        ...(margin ? {margin: margin} : {}),
        ...(verticleAlign ? {alignSelf: verticleAlign} : {}),
        paddingInline: wrapperOverflow ? `var(--space-${wrapperOverflow})` : 'var(--space-m)',
        ...(paddingBlock ? {paddingBlock: `var(--space-${paddingBlock})`} : {}),
        ...(maxWidth ? {maxWidth} : {}),
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
