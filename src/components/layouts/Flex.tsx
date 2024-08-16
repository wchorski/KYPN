import { SpaceSize } from "@ks/types"
import styles from "@styles/flex.module.scss"
import { CSSProperties, ReactNode } from "react"
type Props = {
	children: ReactNode | ReactNode[]
	style?: CSSProperties
	justifyContent?: CSSProperties["justifyContent"]
	paddingBlock?: SpaceSize
	paddingInline?: SpaceSize
	gap?: SpaceSize
}

export default function Flex({
	paddingInline = "m",
	paddingBlock = "m",
	gap = "m",
	justifyContent = 'center',
	style,
	children,
}: Props) {
	const clsNms = ["flex", styles.flex].join(" ")
	const inlineStyles = {
		paddingBlock: `var(--space-${paddingBlock})`,
		paddingInline: `var(--space-${paddingInline})`,
		gap: `var(--space-${gap})`,
		justifyContent: justifyContent,
		// justifyContent: 'space-evenly',
		...style,
	} as CSSProperties

	return (
		<div className={clsNms} style={inlineStyles}>
			{children}
		</div>
	)
}
