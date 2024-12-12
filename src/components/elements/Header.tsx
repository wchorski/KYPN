import { WidthLayoutSize, WidthLayoutSize2 } from "@ks/types"
import { CSSProperties, ReactNode } from "react"
import sLayout, { layout_full } from "@styles/layout.module.css"
import styles from '@styles/blog/blogpost.module.css'

type Props = {
	children: ReactNode
	bgColor?: string
	bgImage?: string | null | undefined
	widthOfContent?: WidthLayoutSize2
	className?: string
	style?: CSSProperties
}

export function Header({
	widthOfContent = "layout_content",
	bgImage,
	bgColor,
	className,
  style,
	children,
}: Props) {
	const cls = [layout_full, bgColor, styles.post_header, className].join(" ")
	const inlineStyle = {
		...(bgImage ? { backgroundImage: `url(${bgImage})` } : {}),
    ...style
	} as CSSProperties
	return (
		<header
			className={cls}
			style={inlineStyle}
		>
			<div className={sLayout[widthOfContent]}>{children}</div>
			{/* <hr className={layout_full} /> */}
		</header>
	)
}
