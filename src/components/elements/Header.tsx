import { BGColor, WidthLayoutSize } from "@ks/types"
import { CSSProperties, ReactNode } from "react"

type Props = {
	children: ReactNode
	bgColor?: BGColor
	bgImage?: string | null | undefined
	widthOfContent?: WidthLayoutSize
	className?: string
	style?: CSSProperties
}

export function Header({
	widthOfContent = "width-wide",
	bgImage,
	bgColor,
	className,
  style,
	children,
}: Props) {
	const cls = ["width-full", bgColor, className].join(" ")
	const inlineStyle = {
		...(bgImage ? { backgroundImage: `url(${bgImage})` } : {}),
    ...style
	} as CSSProperties
	return (
		<header
			className={cls}
			style={inlineStyle}
		>
			<div className={widthOfContent}>{children}</div>
			<hr className="width-full" />
		</header>
	)
}
