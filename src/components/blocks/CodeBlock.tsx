import { ReactNode } from "react"

type Props = {
	// textAlign:'start'|'center'|'end'|undefined,
	children: ReactNode
}

export function CodeBlock(props: Props) {
	// console.log(props);
	const {
		// textAlign,
		children,
	} = props

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

	return (
		<pre className="layout-breakout">
			<code>{children}</code>
		</pre>
	)
}
