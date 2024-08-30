import { CSSProperties, ReactNode } from "react"
import {card, } from "@styles/card.module.scss"
import { bg_c_plain, bg_c_primary, bg_c_reverse_theme, bg_c_secondary, bg_c_transparent } from "@styles/colors.module.scss";
import { ColorsTheme, SpaceSize } from "@ks/types"

type Props = {
	children: ReactNode
	content?:string,
	layout?: "flex" | "grid"
	direction?: "row" | "column"
	id?: string
  colors?: ColorsTheme
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
	layout = 'flex',
	direction = "column",
	children,
  content,
	id,
  colors = 'bg_c_plain',
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

  const bgClr = (() => {
    switch (colors) {
      case 'bg_c_transparent':
        return bg_c_transparent;
      case 'bg_c_reverse_theme':
        return bg_c_reverse_theme;
      case 'bg_c_primary':
        return bg_c_primary;
      case 'bg_c_secondary':
        return bg_c_secondary;
      case 'bg_c_secondary':
        return bg_c_secondary;
      default:
        return bg_c_plain;
    }
  })();

	const clsnms = [card, bgClr].join(" ")

	return (
		<div
			id={id}
			className={[clsnms, colors, className].join(' ')}
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
