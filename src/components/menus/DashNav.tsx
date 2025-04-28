"use client"
import { useUrlHash } from "@hooks/useUrlHash"
import { dashnav } from "@styles/menus/dashboard.module.css"
import styles from "@styles/menus/dashboard.module.css"
import { type ReactNode } from "react"

import { DashNavLink } from "./DashNavLink"

type Props = {
	dashNavData: DashNavData
}

export type DashNavData = {
	slug: string
	text?: string
	isCount: boolean
	icon: ReactNode
}[]

export function DashNav({ dashNavData }: Props) {
	const { hash, setHash } = useUrlHash()

	const navListItems = (navData: DashNavData): JSX.Element[] => {
		return navData
			.filter((item) => item.isCount)
			.map((item, i) => (
				<li
					key={i}
					//? i have to use this components `currHash` to trigger rerender because using plain `<a>` tag
					className={hash === item.slug ? styles.linkactive : ""}
				>
					<DashNavLink
						key={i}
						onClick={handleAnchorClick}
						text={item.text}
						slug={item.slug}
						icon={item.icon}
					/>
				</li>
			))
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
		<nav className={dashnav}>
			{/* <p>{dashState}</p> */}
			<ul className={'unstyled'}>
				{navListItems(dashNavData)}
				
			</ul>
		</nav>
	)
}
