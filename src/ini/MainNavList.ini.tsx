"use client"
import { ReactNode } from "react"
import { NavLink } from "@components/menus/NavLink"
import styles from "@styles/nav.module.css"
import { useNavControl } from "@components/hooks/useGlobalContext"
import Image from "next/image"

export function MainNavList() {
	const { isNavOpen } = useNavControl()

	function getStyles() {
		const stylesArray = [styles.menu_main, isNavOpen ? styles.open : ""]
		return stylesArray.join(" ")
	}

	return (
		<ul className={getStyles()}>
			<li>
				<NavLink href={`/home`}> Home </NavLink>
			</li>
			<li>
				<NavLink href={`/blog`}> Blog </NavLink>{" "}
			</li>
		</ul>
	)
}
