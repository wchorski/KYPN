"use client"
import Link from "next/link"
import { VscListTree } from "react-icons/vsc"
import styles, { heading_fix, table_of_contents } from "@styles/tableofcontents.module.css"
import { IconLabel } from "@components/elements/IconLabel"
import { useEffect, useState } from "react"
import { useUrlHash } from "@hooks/useUrlHash"
import { slugFormat } from "@lib/slugFormat"
import type { KSHeading, TOCLink } from "@ks/types"

// interface Heading {
// 	type: string
// 	level: number
// 	slug: string
// 	text: string
// }
// interface KSHeading {
// 	type: string
// 	level: number
// 	children: { text: string }[]
// }

type Props = {
	headerObjs: any[]
}

// TODO does not account for heirarchy that may start at h3, or if nested headers are more than one level apart (h2 > h4)
export function TableOfContents({ headerObjs }: Props) {
	const { hash, setHash, removeHash } = useUrlHash()
	// const router = useRouter()

	const renderList = (
		items: TOCLink[],
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
					<li
						key={i}
						//? i have to use this components `currHash` to trigger rerender because using plain `<a>` tag
						// className={hash === sluggedId ? styles.active : ""}
						className={hash === item.slug ? styles.active : ""}
					>
						<TOCLink
							key={i}
							onClick={handleAnchorClick}
							text={item.text}
							slug={item.slug}
						/>
						{nestedItems.length > 0 && (
							<ul>{renderList(nestedItems, currentLevel + 1)}</ul>
						)}
					</li>
				)
			}
		}

		return listItems
	}

	const handleAnchorClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		hash: string
	) => {
		setHash(hash)

		//todo doing this looses out on using the `:target` class and have to use class switch `.targeted` instead
    //todo but i want to keep history clean of inner page navigation
		// e.preventDefault()
		// router.replace(`#${hash}`)
	}

	return (
		<nav aria-label="Table of contents" title="Table of contents" className={table_of_contents}>
			<IconLabel icon={<VscListTree />} label="Table of Contents" className={heading_fix}/>
			<ul className="unstyled">{renderList(headerObjs)}</ul>
		</nav>
	)
}

type TOCLinkProps = {
	onClick: (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		slug: string
	) => any
	text: string
	slug: string
}

function TOCLink({ onClick, slug, text }: TOCLinkProps) {
	return (
		<a
			href={`#${slug}`}
			onClick={(e) => onClick(e, slug)}
		>
			{text}
		</a>
	)
}