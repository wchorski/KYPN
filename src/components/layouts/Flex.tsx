import type {  SpaceSize  } from "@ks/types"
import styles from "@styles/flex.module.scss"
import type { CSSProperties, ReactNode } from "react"
type Props = {
	children: ReactNode | ReactNode[]
	style?: CSSProperties
	justifyContent?: CSSProperties["justifyContent"]
	alignItems?: CSSProperties["alignItems"]
	paddingBlock?: SpaceSize
	paddingInline?: SpaceSize
	gap?: SpaceSize
  className?:string,
  flexDirection?:CSSProperties['flexDirection']
}

export default function Flex({
	paddingInline = 0,
	paddingBlock = 0,
	gap = "m",
	justifyContent = 'start',
	alignItems = 'start',
	style,
	children,
  className,
  flexDirection,
}: Props) {
	const clsNms = ["flex", styles.flex, className].join(" ")
	const inlineStyles = {
		paddingBlock: `var(--space-${paddingBlock})`,
		paddingInline: `var(--space-${paddingInline})`,
		gap: `var(--space-${gap})`,
		justifyContent,
		alignItems,
    // placeContent: 'normal',
    ...(flexDirection ? {flexDirection} : {}),
		// justifyContent: 'space-evenly',
		...style,
	} as CSSProperties

	return (
		<div className={clsNms} style={inlineStyles}>
			{children}
		</div>
	)
}
