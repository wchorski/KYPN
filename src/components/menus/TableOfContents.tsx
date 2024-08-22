import Link from "next/link"
import { VscListTree } from "react-icons/vsc"

interface Heading {
	type: string
	level: number
	children: { text: string }[]
}

type Props = {
	headerObjs: any[]
	hrefBase: string
}

export function TableOfContents({ hrefBase, headerObjs }: Props) {
	const renderList = (
		items: Heading[],
		currentLevel: number = 2
	): JSX.Element[] => {
		const listItems: JSX.Element[] = []

		for (let i = 0; i < items.length; i++) {
			const item = items[i]

			if (item.level === currentLevel) {
				let nestedItems = []

				for (let j = i + 1; j < items.length; j++) {
					if (items[j].level > currentLevel) {
						nestedItems.push(items[j])
					} else if (items[j].level <= currentLevel) {
						break
					}
				}

				listItems.push(
					<li key={i}>
						<Link key={i} href={`${hrefBase}#${String(item.children[0].text)}`}>
							{item.children[0].text}
						</Link>
						{nestedItems.length > 0 && (
							<ul>{renderList(nestedItems, currentLevel + 1)}</ul>
						)}
					</li>
				)
			}
		}

		return listItems
	}

	return (
		<nav aria-label="Table of contents" className="table-of-contents">
			<h2
				className="icon-label"
				style={{
					fontSize: "2rem",
				}}
			>
				<VscListTree /> Table of Contents
			</h2>
			<ul className="unstyled">
				{/* {headerObjs.map((h: any, i: number) => (
					<li key={i}>
						<Link key={i} href={`${hrefBase}#${String(h.children[0].text)}`}>
							{h.level}
							{` | `}
							{h.children[0].text}
						</Link>
					</li>
				))} */}
				{renderList(headerObjs)}
			</ul>
		</nav>
	)
}
