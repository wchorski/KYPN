import styles from '@styles/nav.module.scss'
import Link from 'next/link'
import { SiGithub } from 'react-icons/si'
import { NavLink } from '@components/menus/NavLink'
import { SessionBadge } from './Session'
import { CartButton } from '@components/ecommerce/CartButton'

export function Nav() {

  return (
    <nav 
      className={styles.nav}
    >

      <div className="siteWrapper">
        <ul className='main'>
          <li> <NavLink href={`/home`}> Home </NavLink> </li>
          <li> <NavLink href={`/shop`}> Shop </NavLink> </li>
          <li> <NavLink href={`/blog`}> Blog </NavLink> </li>
          <li> <NavLink href={`/users`}> Users </NavLink> </li>
          {/* <li> <Link href={`https://github.com/wchorski/duplicati-dashboard`}> API </Link> </li> */}
          {/* <li> <Link href={`/`}> Settings </Link> </li> */}
        </ul>

        <ul className='links utility'>
          <li>
            <CartButton />
          </li>
          <li>
            <SessionBadge label='account'/>
          </li>
        </ul>
      </div>
    </nav>
  )
}
