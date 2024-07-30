import { CSSProperties, ReactNode } from "react"
import { GridLayout } from "@ks/types"
// import styles from "@styles/elements/section.module.scss";

type Props = {
	pad?: number
	imageSrc?: string
	color?: string
	overlay?: string
	col?: number
	layout: GridLayout
	children: ReactNode | ReactNode[]
	id?: string
	styles?: CSSProperties
	className?: string
	height?: string
}

export async function Section({
	pad = 1,
	height,
	imageSrc,
	color,
	overlay,
	col,
	layout = "1_1",
	children,
	id,
	styles,
	className,
}: Props) {
	//                                  gotta put a '_' in front because css no like numbers as class names
	const stylesArr = ["section", `grid`, `overlay`, [`_${layout}`], className]

	const inlineStyles: CSSProperties = {
		minHeight: height,
		"--c-overlay": overlay,
		backgroundColor: color,
		backgroundImage: imageSrc ? `url(${imageSrc})` : "",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		...styles,
	} as CSSProperties

	return (
		<section id={id} className={stylesArr.join(" ")} style={inlineStyles}>
			{Array.isArray(children) ? (
				children?.map((child: any, i: number) => <div key={i}>{child}</div>)
			) : (
				<div>{children}</div>
			)}
		</section>
	)
}
