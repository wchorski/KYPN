import { JSXElementConstructor, ReactElement, ReactNode } from "react"

type Props = {
	type: "unordered" | "ordered"
	_owner: any
	_store: any
	ref: any
	children: ReactElement<any, string | JSXElementConstructor<any>>[]
}

export function ListBlock(props: Props) {
	// console.log(props);
	const { children, type } = props

	console.log(JSON.stringify(children, null, 2))

	// const pStyle:any = {
	//   gridColumn: '2/3',
	//   textAlign: textAlign,
	// }

	// switch (textAlign) {
	//   case 'start':
	//     pStyle.marginRight = "auto";
	//     break;

	//   case 'center':
	//     pStyle.marginInline = "auto";
	//     break;

	//   case 'end':
	//     pStyle.marginLeft = "auto";
	//     break;

	//   default:
	//     pStyle.marginRight = "auto";
	//     break;
	// }

	if (type === "ordered")
		return (
			<ol>
				{children.map((child) => (
					<li key={child.key}>{}</li>
				))}
			</ol>
		)

	return (
		<ul>
			{children.map((child) => (
				<li key={child.key}>{child.props.node}</li>
			))}
		</ul>
	)
}
