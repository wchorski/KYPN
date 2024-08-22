import { SpaceSize } from "@ks/types"
import styles from "@styles/flex.module.scss"
import { CSSProperties, ReactNode } from "react"
type Props = {
	children: ReactNode | ReactNode[]
	style?: CSSProperties
	justifyContent?: CSSProperties["justifyContent"]
	alignContent?: CSSProperties["alignContent"]
	paddingBlock?: SpaceSize
	paddingInline?: SpaceSize
	gap?: SpaceSize
  className?:string,
  flexDirection?:CSSProperties['flexDirection']
}

export default function Flex({
	paddingInline = "m",
	paddingBlock = "m",
	gap = "m",
	justifyContent = 'center',
	alignContent = 'center',
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
		justifyContent: justifyContent,
		alignContent: justifyContent,
    placeContent: 'normal',
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
