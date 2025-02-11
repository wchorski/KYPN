"use client"
import { NavLink } from "@components/menus/NavLink"
import styles from "@styles/nav.module.css"
import { useNavControl } from "@hooks/useGlobalContext"

export function MainNavList() {
	const { isNavOpen } = useNavControl()

	function getStyles() {
		const stylesArray = [styles.menu_main, isNavOpen ? styles.open : ""]
		return stylesArray.join(" ")
	}

	return (
		<ul className={getStyles()}>
			<li>
				<NavLink href={`/home`}>Home</NavLink>
			</li>
			<li>
				<NavLink href={`/posts`}>Blog</NavLink>
			</li>
			<li>
				<NavLink href={`/shop`}>Shop</NavLink>
			</li>
			{/* <li>
				<NavLink href={`/services`}>Services</NavLink>
			</li> */}
			<li>
				<NavLink href={`/book-a-service`}>Book a Service</NavLink>
			</li>
			<li>
				<NavLink href={`/events`}>Events</NavLink>
			</li>
		</ul>
	)
}
