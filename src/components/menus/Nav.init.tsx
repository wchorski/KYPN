import styles from '@styles/nav.module.scss'
import { NavLink } from '@components/menus/NavLink'
import { CartButton } from '@components/ecommerce/CartButton'
import { NavWichButton } from './NavWichButton'
import { SessionBadge } from './Session'
import { MainNavList } from './MainNavList'

export function Nav() {

  // const { isNavOpen, toggleNav } = useNavControl()
  const isNavOpen = true

  return (
    <nav 
      className={styles.nav}
    >

      <div className="siteWrapper">

        <NavWichButton />

        <MainNavList />

        <ul className='links utility'>
          {/* <li>
            <CartButton />
          </li> */}
          <li>
            <SessionBadge label='account'/>
          </li>
        </ul>
      </div>
    </nav>
  )
}
