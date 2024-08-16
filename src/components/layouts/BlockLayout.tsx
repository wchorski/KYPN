import { GridLayout, SpaceSize } from "@ks/types"
import type { CSSProperties, ReactNode } from "react"

type Props = {
	className?: string
	style?: CSSProperties
	children: ReactNode | ReactNode[]
	id?: string
	gap?: SpaceSize
	layout: GridLayout
	col_bg_colors?: string[]
	col_bg_imgs?: string[]
	verticalAlign?: "start" | "center" | "end"
	horizontalAlign?: "start" | "center" | "end"
  paddingBlock?:SpaceSize
}

export function BlockLayout({
	id,
	layout = "1_1",
	gap,
	className,
	style,
	children,
	verticalAlign = "start",
	horizontalAlign = "center",
	col_bg_colors,
	col_bg_imgs,
  paddingBlock
}: Props) {
	const clsNames = ["site-grid", `_${layout}`, className].join(" ")
	const inlineStyles = { 
    gap: gap ? `var(--space-${gap})` : "0", 
    ...(paddingBlock ? {paddingBlock: `var(--space-${paddingBlock})`} : {}),
    ...style 
  }

	if (layout === "1")
		return (
			<div
				id={id}
				className={clsNames}
				style={inlineStyles}
			>
				{children}
			</div>
		)
	//todo make a note of this, it's ugly but it works
	return (
		<div id={id} className={clsNames} style={inlineStyles}>
			{Array.isArray(children) ? (
				children?.map((child: any, i: number) => (
					<div
						key={i}
						className="grid-item"
						style={{
							alignItems: verticalAlign,
							justifyContent: horizontalAlign,
							backgroundColor: col_bg_colors ? col_bg_colors[i] : "",
							...(col_bg_imgs
								? { backgroundImage: `url(${col_bg_imgs[i]})` }
								: {}),
						}}
					>
						{child}
					</div>
				))
			) : (
				<>{children}</>
			)}
		</div>
	)
}
