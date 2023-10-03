import styles from '@styles/nav.module.scss'
import Link from 'next/link'
import { SiGithub } from 'react-icons/si'
import { NavLink } from '@components/menus/NavLink'

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
          {/* <li> <Link href={`https://github.com/wchorski/duplicati-dashboard`}> API </Link> </li> */}
          {/* <li> <Link href={`/`}> Settings </Link> </li> */}
        </ul>

        <ul className='links utility'>
          <li>
            <NavLink
              href="https://github.com/wchorski/duplicati-dashboard"
              target={'_blank'}
            >
              <SiGithub />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
