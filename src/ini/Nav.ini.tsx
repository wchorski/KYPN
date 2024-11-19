import styles from "@styles/nav.module.scss"
import { NavWichButton } from "@components/menus/NavWichButton"
import { SessionBadge } from "@components/menus/Session"
import { MainNavList } from "@components/private/MainNavList"

export function Nav() {
	// const { isNavOpen, toggleNav } = useNavControl()
	const isNavOpen = true

	return (
		<nav className={styles.nav} aria-label="Main Site Navigation">
			<div className="siteWrapper">
				<NavWichButton />

				<MainNavList />

				<ul className="links utility">
					{/* <li>
            <CartButton />
          </li> */}
					<li>
						<SessionBadge label="account" />
					</li>
				</ul>
			</div>
		</nav>
	)
}
