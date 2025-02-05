import styles, { nav, utility } from "@styles/nav.module.css"
import { NavWichButton } from "../menus/NavWichButton"
import { SessionBadge } from "../menus/Session"
import { MainNavList } from "./MainNavList"
import { layout_site, page_layout } from "@styles/layout.module.css"
import Flex from "@components/layouts/Flex"
import { CartBadgeButton } from "@components/ecommerce/CartBadgeButton"

export function Nav() {
	// const { isNavOpen, toggleNav } = useNavControl()
	const isNavOpen = true

	return (
		<nav className={[nav, page_layout].join(' ')} aria-label="Main Site Navigation">
			<Flex 
        // className="siteWrapper"
        justifyContent={'space-between'}
        className={layout_site} 
      >
				<NavWichButton />

				<MainNavList />

				<ul className={utility}>
					<li>
            <CartBadgeButton />
          </li>
					<li>
						<SessionBadge label="account" />
					</li>
				</ul>
			</Flex>
		</nav>
	)
}
