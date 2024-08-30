import { CSSProperties, ReactNode } from "react"
import { GridLayout, SpaceSize } from "@ks/types"
import {grid, auto} from "@styles/grid.module.scss"

type Props = {
	pad?: number
	imageSrc?: string
	color?: string
	col?: number
	layout?: GridLayout
	children: ReactNode | ReactNode[]
	id?: string
	style?: CSSProperties
	className?: string
	gap?: SpaceSize
  verticalAlign?: "start" | "center" | "end"
	horizontalAlign?: "start" | "center" | "end"
  //todo make `colWidth` required if isAuto === true
  isAuto?:boolean
  colWidth?:string
}

export function Grid({
	pad = 1,
	imageSrc,
	color,
	col,
	layout = "1_1",
	children,
	id,
	style,
	gap,
	className,
  verticalAlign = "start",
	horizontalAlign = "start",
  isAuto = true,
  colWidth
}: Props) {
	//                                  gotta put a '_' in front because css no like numbers as class names
	const classNms:string[] = [grid, isAuto ? auto : '', className ? className : '']
	// todo trying global instead of module
	// const stylesArr = [styleModule.section, styleModule[`grid_${layout}`] ]
	const inlineStyles = {
    "--col-width": colWidth,
    alignItems: verticalAlign,
    justifyItems: horizontalAlign,
		gap: gap ? `var(--space-${gap})` : "0",
		...(color ? { backgroundColor: color } : {}),
		...(imageSrc ? { backgroundImage: `url(${imageSrc})` } : {}),
		...style,
	} as CSSProperties

	return (
		<div id={id} className={classNms.join(" ")} style={inlineStyles}>
			{children}
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
