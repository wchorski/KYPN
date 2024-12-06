import { CSSProperties, ReactNode } from "react"
import { GridLayout, SpaceSize } from "@ks/types"
import { layout_full, layout_site } from "@styles/layout.module.css"
// import styles from "@styles/elements/section.module.scss";

type Props = {
	paddingBlock?: SpaceSize
	marginBlock?: SpaceSize
	imageSrc?: string
	// todo change color to bgColor and leave color for text inside
	color?: string
	bgColor?: string
	overlay?: string
	col?: number
	layout?: GridLayout
	children: ReactNode | ReactNode[]
	id?: string
	styles?: CSSProperties
	className?: string
	height?: string
}

export async function Section({
	paddingBlock = "l",
	marginBlock = "l",
	imageSrc,
	color,
	overlay,
	col,
	layout = "1_1",
	children,
	id,
	styles,
	className,
	bgColor,
}: Props) {
	//                                  gotta put a '_' in front because css no like numbers as class names
	const cls = [`overlay`, className, layout_full, bgColor].join(" ")

	const inlineStyles: CSSProperties = {
		paddingBlock: `var(--space-${paddingBlock})`,
		marginBlock: `var(--space-${marginBlock})`,
		"--c-overlay": overlay,
		...(color ? { backgroundColor: color } : {}),
		backgroundImage: imageSrc ? `url(${imageSrc})` : "",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
    display: 'grid',
		...styles,
	} as CSSProperties

	return (
		<section id={id} className={cls} style={inlineStyles}>
			<div className={layout_site}>{children}</div>
		</section>
	)
}
