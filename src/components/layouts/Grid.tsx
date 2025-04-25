import type { GridLayout, SpaceSize } from "@ks/types"
import {
	_1,
	_1_1,
	_1_1_1,
	_1_1_1_1,
	_1_2,
	_1_2_1,
	_1_4,
	_2_1,
	auto,
	grid,
	grid_item,
} from "@styles/grid.module.css"
import type { CSSProperties, ReactNode } from "react"

type Props = {
	pad?: number
	imageSrc?: string
	color?: string
	col?: number
	layout?: GridLayout
	children?: ReactNode | ReactNode[]
	content?: ReactNode | ReactNode[]
	id?: string
	style?: CSSProperties
	className?: string
	gap?: SpaceSize
	verticalAlign?: "start" | "center" | "end"
	horizontalAlign?: "start" | "center" | "end"
	//todo make `colWidth` required if isAuto === true
	isAuto?: boolean
	colWidth?: string
	alignContent?: CSSProperties["alignContent"]
	placeItems?: CSSProperties["placeItems"]
	placeContent?: CSSProperties["placeContent"]
	layoutWidth?: string
	gridColumn?: CSSProperties["gridColumn"]
}

export function Grid({
	pad = 1,
	imageSrc,
	color,
	col,
	layout = "1_1",
	children,
	content,
	id,
	style,
	gap = "m",
	className = "",
	verticalAlign = "start",
	horizontalAlign = "start",
	isAuto = true,
	colWidth,
	alignContent = "center",
	placeItems,
	// placeContent = "stretch",
	layoutWidth,
	gridColumn,
}: Props) {
	const layoutStyle = (() => {
		switch (layout) {
			case "1":
				return _1
			case "1_1":
				return _1_1
			case "1_2":
				return _1_2
			case "2_1":
				return _2_1
			case "1_1_1":
				return _1_1_1
			case "1_2_1":
				return _1_2_1
			case "1_1_1_1":
				return _1_1_1_1
			case "1_4":
				return _1_4
			default:
				return _1
		}
	})()

	const layoutArray = layout.split("_")

	const layout_width = (() => {
		switch (true) {
			case layoutWidth !== undefined:
				return layoutWidth

			case layoutArray.length > 2:
				return "layout_site"

			default:
				return "layout_wide"
		}
	})()

	//! override issues
	// const layout_width = (() => {
	// 	switch (true) {
	// 		case layoutWidth !== undefined:
	// 			return layoutWidth

	// 		case layoutArray.length > 2:
	// 			return layout_site

	// 		default:
	// 			return layout_wide
	// 	}
	// })()

	const classNms = [
		"grid",
		grid,
		// isAuto ? auto : layoutStyle,
		layoutStyle ? layoutStyle : auto,
		// layout_width,
		className,
	].join(" ")
	// todo trying global instead of module
	// const stylesArr = [styleModule.section, styleModule[`grid_${layout}`] ]
	const inlineStyles = {
		"--col-width": colWidth,
    gridColumn: layout_width,
		alignItems: verticalAlign,
		justifyItems: horizontalAlign,
		gap: gap ? `var(--space-${gap})` : "0",
		...(color ? { backgroundColor: color } : {}),
		...(gridColumn ? { gridColumn } : {}),
		...(imageSrc ? { backgroundImage: `url(${imageSrc})` } : {}),
		...style,
	} as CSSProperties

	if (Array.isArray(children))
		return (
			<div id={id} className={classNms} style={inlineStyles}>
				{children.map((child, i) => (
					<div
						key={i}
						className={grid_item}
						// style={{ alignContent: "center", justifyContent: "center" }}
					>
						{child}
					</div>
				))}
			</div>
		)

	return (
		<div id={id} className={classNms} style={inlineStyles}>
			{children}
			{content}
		</div>
	)

	// return (
	//   <div
	//     id={id}
	//     className={stylesArr.join(' ')}
	//     style={inlineStyles}
	//   >

	//     {Array.isArray(children) ? children?.map((child:any, i:number) => (
	//       <div key={i}>
	//         {child}
	//       </div>
	//     )) : (
	//       <div>
	//         {children}
	//       </div>
	//     ) }

	//   </div>
	// )
}
