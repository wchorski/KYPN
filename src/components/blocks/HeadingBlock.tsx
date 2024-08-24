import { slugFormat } from "@lib/slugFormat"
import { CSSProperties, ReactNode } from "react"

type Props = {
	level: 1 | 2 | 3 | 4 | 5 | 6
	id?: string
	children: ReactNode | ReactNode[]
	textAlign?: "start" | "center" | "end" | undefined
}

export function HeadingBlock({ id, level, children, textAlign }: Props) {
	//@ts-ignore
	const dynID = id ? id : children[0] ? children[0].props.node.text : "no_id"
	// console.log(encodeURIComponent('hello there friend'));

	return (
		<Element 
      id={slugFormat(dynID)}
      // id={dynID}
      // id={encodeURIComponent(dynID)}
      level={level} 
      textAlign={textAlign} 
    >
			{children}
		</Element>
	)
}

function Element({ id, level, textAlign, children }: Props) {
	const style: CSSProperties = {
		...(textAlign ? { textAlign } : {}),
	}

	// switch (textAlign) {
	// 	case "center":
	// 		style.marginInline = "auto"
	// 		break

	// 	case "end":
	// 		style.marginLeft = "auto"
	// 		break

	// 	default:
	// 		style.marginRight = "auto"
	// 		break
	// }

	if (level === 2)
		return (
			<h2 id={id} style={style}>
				{children}
			</h2>
		)

	if (level === 3)
		return (
			<h3 id={id} style={style}>
				{children}
			</h3>
		)

	if (level === 4)
		return (
			<h4 id={id} style={style}>
				{children}
			</h4>
		)

	if (level === 5)
		return (
			<h5 id={id} style={style}>
				{children}
			</h5>
		)

	if (level === 6)
		return (
			<h6 id={id} style={style}>
				{children}
			</h6>
		)

	return <p className="error"> error: no level {level}</p>
}
